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

  // Update profile details (profiles columns only)
  async updateProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId);

    if (error) throw error;
    return data;
  }

  async updatePreferences(userId, prefData) {
    const { data: existing, error: selectError } = await supabase
      .from('preferences')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (selectError) throw selectError;

    if (existing) {
      const { data, error } = await supabase
        .from('preferences')
        .update(prefData)
        .eq('user_id', userId);

      if (error) throw error;
      return data;
    }

    const { data, error } = await supabase
      .from('preferences')
      .insert([{ user_id: userId, ...prefData }]);

    if (error) throw error;
    return data;
  }
}

export const profileService = new ProfileService();