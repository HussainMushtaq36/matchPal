import { supabase } from './supabaseClient';

class NotificationService {
  async getNotificationsByUserId(userId) {
    const { data, error } = await supabase
      .from('notifications')
      .select('id, user_id, type, content, target_route, is_read, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  subscribeToUserNotifications(userId, onDatabaseChange) {
    if (!userId || typeof onDatabaseChange !== 'function') {
      return null;
    }

    const channel = supabase
      .channel(`notifications-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          if (payload.new && payload.new.user_id === userId) {
            onDatabaseChange();
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

export const notificationService = new NotificationService();
