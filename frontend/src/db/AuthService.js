import { supabase } from './supabaseClient';

class AuthService {
  // Signs up a new user and adds them to Supabase Auth
  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  // Logs an existing user in
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  // Logs the user out
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}

export const authService = new AuthService();