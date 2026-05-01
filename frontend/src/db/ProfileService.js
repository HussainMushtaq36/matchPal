import { supabase } from './supabaseClient';

class ProfileService {
  // Get a user's profile and their preferences together
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*, preferences(*)')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Update profile details (like bio, city, etc.)
  async updateProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId);
      
    if (error) throw error;
    return data;
  }
}

export const profileService = new ProfileService();