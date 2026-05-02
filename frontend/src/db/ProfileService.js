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
    const { data, error } = await supabase
      .from('preferences')
      .upsert([{ user_id: userId, ...prefData }], { onConflict: 'user_id' })
      .select();

    if (error) throw error;
    return data;
  }

  async getAllProfiles(excludeUserId) {
    let query = supabase.from('profiles').select('*');
    if (excludeUserId) {
      query = query.neq('id', excludeUserId);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getPreferencesByUserIds(userIds) {
    if (!Array.isArray(userIds) || userIds.length === 0) return [];
    const { data, error } = await supabase
      .from('preferences')
      .select('*')
      .in('user_id', userIds);
    if (error) throw error;
    return data || [];
  }

  async getProfilesByIds(userIds) {
    if (!Array.isArray(userIds) || userIds.length === 0) return [];
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .in('id', userIds);
    if (error) throw error;
    return data || [];
  }
}

export const profileService = new ProfileService();