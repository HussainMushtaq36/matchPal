import { supabase } from './supabaseClient';

class AdminService {
  async updateUserStatus(userId, newStatus) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ status: newStatus })
      .eq('id', userId);

    if (error) throw error;
    return data;
  }

  async updateReportStatus(reportId, newStatus) {
    const { data, error } = await supabase
      .from('user_reports')
      .update({ status: newStatus })
      .eq('id', reportId);

    if (error) throw error;
    return data;
  }

  async getPendingReports() {
    const { data, error } = await supabase
      .from('user_reports')
      .select('*')
      .eq('status', 'Pending');

    if (error) throw error;
    return data;
  }

  async deleteUser(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (error) throw error;
    return data;
  }

  async getPendingMatchesCount() {
    const { count, error } = await supabase
      .from('interactions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Pending');

    if (error) throw error;
    return count || 0;
  }
}

export const adminService = new AdminService();
