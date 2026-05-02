import { supabase } from './supabaseClient';

class MessageService {
  async getAcceptedProfiles(currentUserId) {
    const { data: links, error: linksError } = await supabase
      .from('interactions')
      .select('sender_id, receiver_id')
      .eq('type', 'match')
      .eq('status', 'accepted')
      .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`);
    if (linksError) throw linksError;

    const peerIds = Array.from(
      new Set(
        (links || []).map((row) => (row.sender_id === currentUserId ? row.receiver_id : row.sender_id))
      )
    );
    if (peerIds.length === 0) return [];

    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .in('id', peerIds)
      .neq('role', 'admin');
    if (profilesError) throw profilesError;
    return profiles || [];
  }

  async getMessagesBetweenUsers(currentUserId, peerId) {
    const { data, error } = await supabase
      .from('messages')
      .select('id, sender_id, receiver_id, content, created_at')
      .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${peerId}),and(sender_id.eq.${peerId},receiver_id.eq.${currentUserId})`)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async sendMessage(senderId, receiverId, content) {
    const trimmed = (content || '').trim();
    if (!trimmed) {
      throw new Error('Message cannot be empty.');
    }
    const { data, error } = await supabase
      .from('messages')
      .insert([{ sender_id: senderId, receiver_id: receiverId, content: trimmed }])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  subscribeToConversation(currentUserId, peerId, onNewMessage) {
    if (!currentUserId || !peerId || typeof onNewMessage !== 'function') {
      return null;
    }
    const channel = supabase
      .channel(`chat-${currentUserId}-${peerId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const row = payload.new;
          if (!row) return;
          const isCurrentConversation =
            (row.sender_id === currentUserId && row.receiver_id === peerId) ||
            (row.sender_id === peerId && row.receiver_id === currentUserId);
          if (isCurrentConversation) {
            onNewMessage(row);
          }
        }
      )
      .subscribe();

    return channel;
  }

  unsubscribe(channel) {
    if (!channel) return;
    supabase.removeChannel(channel);
  }
}

export const messageService = new MessageService();
