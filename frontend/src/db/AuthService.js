import { supabase } from './supabaseClient';

function roleFromEmail(email) {
  const normalized = (email || '').trim().toLowerCase();
  return normalized === 'admin@matchpal.com' ? 'admin' : 'user';
}

class AuthService {
  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    const sessionUser = data?.user || data?.session?.user;
    if (!sessionUser?.id) {
      throw new Error('Unable to resolve authenticated user session.');
    }
    return {
      ...data,
      user: {
        ...sessionUser,
        role: roleFromEmail(sessionUser.email),
      },
    };
  }

  async logout() {
    return supabase.auth.signOut();
  }

  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    if (!user?.id) {
      throw new Error('No active authenticated session found.');
    }
    return {
      id: user.id,
      email: user.email || '',
      role: roleFromEmail(user.email),
    };
  }
}

export const authService = new AuthService();