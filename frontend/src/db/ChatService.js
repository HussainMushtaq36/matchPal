import { supabase } from './supabaseClient';

class ChatService {
  // Send a message to someone
  async sendMessage(senderId, receiverId, content) {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ sender_id: senderId, receiver_id: receiverId, content: content }]);
      
    if (error) throw error;
    return data;
  }

  // Get chat history between two users
  async getMessages(userOne, userTwo) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${userOne},receiver_id.eq.${userTwo}),and(sender_id.eq.${userTwo},receiver_id.eq.${userOne})`)
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    return data;
  }
}

export const chatService = new ChatService();