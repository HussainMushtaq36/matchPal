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
      .insert([{ sender_id: senderId, receiver_id: receiverId, type: type }]);
      
    if (error) throw error;
    return data;
  }
}

export const matchService = new MatchService();