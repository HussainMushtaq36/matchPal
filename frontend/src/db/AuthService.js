import { supabase } from './supabaseClient';

function roleFromEmail(email) {
  const normalized = (email || '').trim().toLowerCase();
  return normalized === 'admin@matchpal.com' ? 'admin' : 'user';
}

class AuthService {
  constructor() {
    this._lastLoginEmail = null;
  }

  // Signs up a new user - Keep this as is for now
  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  // BYPASS VERSION: Logs an existing user in without checking Supabase
  async login(email, password) {
    console.warn("⚠️ AUTH BYPASS ACTIVE: Returning mock user session.");

    const resolvedEmail = email || 'test@matchpal.com';
    this._lastLoginEmail = resolvedEmail;
    const role = roleFromEmail(resolvedEmail);

    // We return a mock "data" object that looks like a real Supabase response
    return {
      user: {
        id: 'mock-user-123',
        email: resolvedEmail,
        role,
        user_metadata: { full_name: 'Alex Rivers' }
      },
      session: {
        access_token: 'fake-token',
        refresh_token: 'fake-refresh-token'
      }
    };
  }

  // Logs the user out
  async logout() {
    // Simply return success
    return { error: null };
  }

  // If your components check for an active session, add this:
  async getCurrentUser() {
    const email = this._lastLoginEmail || 'test@matchpal.com';
    return {
      id: 'mock-user-123',
      email,
      role: roleFromEmail(email)
    };
  }
}

export const authService = new AuthService();