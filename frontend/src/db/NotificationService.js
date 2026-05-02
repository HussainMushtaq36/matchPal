import { supabase } from './supabaseClient';

class NotificationService {
  async getNotificationsByUserId(userId) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
}

export const notificationService = new NotificationService();
