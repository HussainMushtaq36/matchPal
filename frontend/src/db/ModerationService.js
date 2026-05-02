import { supabase } from './supabaseClient';

class ModerationService {
  async reportUser({ reporterId, targetId, reason, details }) {
    const { data, error } = await supabase
      .from('user_reports')
      .insert([
        {
          reporter_id: reporterId,
          target_id: targetId,
          reason: reason || 'unspecified',
          details: details || null,
          status: 'Pending',
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async blockUser({ reporterId, targetId }) {
    const { data, error } = await supabase
      .from('blocked_users')
      .insert([
        {
          reporter_id: reporterId,
          target_id: targetId,
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

export const moderationService = new ModerationService();
