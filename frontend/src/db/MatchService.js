import { supabase } from './supabaseClient';

class MatchService {
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
    const { data, error } = await supabase
      .from('interactions')
      .insert([
        {
          sender_id: senderId,
          receiver_id: receiverId,
          type,
          status: 'Pending',
        },
      ]);
      
    if (error) throw error;
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
}

export const matchService = new MatchService();