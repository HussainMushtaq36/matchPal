import { supabase } from './supabaseClient';

class MatchService {
  async createNotification(userId, type, content, targetRoute = '/notifications') {
    const { error } = await supabase.from('notifications').insert([
      {
        user_id: userId,
        type,
        content,
        target_route: targetRoute,
        is_read: false,
      },
    ]);
    if (error) throw error;
  }

  // Find users in the same city (excluding the current user)
  async getPotentialMatches(city, currentUserId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*, preferences(*)')
      .eq('city', city)
      .neq('id', currentUserId)
      .neq('role', 'admin');
      
    if (error) throw error;
    return data;
  }

  // Swipe Right (Like) or Swipe Left (Dislike)
  async recordInteraction(senderId, receiverId, type) {
    if (!senderId || !receiverId || senderId === receiverId) {
      throw new Error('Invalid interaction participants.');
    }
    const { data, error } = await supabase
      .from('interactions')
      .insert([
        {
          sender_id: senderId,
          receiver_id: receiverId,
          type,
          status: 'pending',
        },
      ])
      .select()
      .single();
      
    if (error) throw error;
    if (type === 'match') {
      await this.createNotification(
        receiverId,
        'match_request',
        'You received a new roommate request.',
        '/match-requests'
      );
    }
    return data;
  }

  async hasInteraction(senderId, receiverId, type) {
    const { data, error } = await supabase
      .from('interactions')
      .select('id, type')
      .eq('type', type)
      .or(
        `and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`
      );
    if (error) throw error;
    return (data || []).length > 0;
  }

  async getInteractionStatusMap(currentUserId, otherUserIds) {
    if (!currentUserId || !Array.isArray(otherUserIds) || otherUserIds.length === 0) return {};
    const { data, error } = await supabase
      .from('interactions')
      .select('sender_id, receiver_id, status, type')
      .eq('type', 'match')
      .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`);
    if (error) throw error;

    const targetSet = new Set(otherUserIds);
    const result = {};
    (data || []).forEach((row) => {
      const peerId = row.sender_id === currentUserId ? row.receiver_id : row.sender_id;
      if (!targetSet.has(peerId)) return;
      result[peerId] = row.status;
    });
    return result;
  }

  async getBrowsableProfiles(currentUserId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', currentUserId)
      .neq('role', 'admin');
    if (error) throw error;
    return data || [];
  }

  async getIncomingRequests(userId) {
    const { data, error } = await supabase
      .from('interactions')
      .select('*')
      .eq('receiver_id', userId)
      .eq('type', 'match')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async respondToRequest(interactionId, senderId, receiverId, decision, receiverName = 'A user') {
    if (!interactionId) throw new Error('Missing interaction ID.');
    if (!senderId || !receiverId || senderId === receiverId) {
      throw new Error('Invalid request participants.');
    }
    const nextStatus = decision === 'accept' ? 'accepted' : 'rejected';
    const { data, error } = await supabase
      .from('interactions')
      .update({ status: nextStatus })
      .eq('id', interactionId)
      .eq('receiver_id', receiverId)
      .eq('type', 'match')
      .select()
      .single();
    if (error) throw error;

    if (nextStatus === 'accepted') {
      await this.createNotification(
        senderId,
        'match_accepted',
        `${receiverName} accepted your match request! You can now chat.`,
        '/messages'
      );
    }
    return data;
  }
}

export const matchService = new MatchService();