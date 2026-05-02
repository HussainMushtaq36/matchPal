import { supabase } from './supabaseClient';

class MatchService {
  async createNotification(userId, title, message, targetRoute = '/match-requests') {
    const { error } = await supabase.from('notifications').insert([
      {
        user_id: userId,
        title,
        message,
        target_route: targetRoute,
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
      .neq('id', currentUserId);
      
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
          status: 'Pending',
        },
      ])
      .select()
      .single();
      
    if (error) throw error;
    if (['like', 'request'].includes(type)) {
      await this.createNotification(
        receiverId,
        'New Match Request',
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
      .eq('sender_id', senderId)
      .eq('receiver_id', receiverId)
      .eq('type', type);
    if (error) throw error;
    return (data || []).length > 0;
  }

  async getIncomingRequests(userId) {
    const { data, error } = await supabase
      .from('interactions')
      .select('*')
      .eq('receiver_id', userId)
      .eq('type', 'like')
      .eq('status', 'Pending')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async respondToRequest(interactionId, senderId, receiverId, decision) {
    if (!interactionId) throw new Error('Missing interaction ID.');
    if (!senderId || !receiverId || senderId === receiverId) {
      throw new Error('Invalid request participants.');
    }
    const nextStatus = decision === 'accept' ? 'Accepted' : 'Rejected';
    const { data, error } = await supabase
      .from('interactions')
      .update({ status: nextStatus })
      .eq('id', interactionId)
      .eq('receiver_id', receiverId)
      .select()
      .single();
    if (error) throw error;

    await this.createNotification(
      senderId,
      nextStatus === 'Accepted' ? 'Request Accepted' : 'Request Rejected',
      nextStatus === 'Accepted'
        ? 'Your roommate request has been accepted.'
        : 'Your roommate request has been rejected.',
      '/notifications'
    );
    return data;
  }
}

export const matchService = new MatchService();