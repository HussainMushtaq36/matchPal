import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pamqizioiptgirzqhorp.supabase.co';
const supabaseKey = 'sb_publishable_tmW8RUU9OBzsZQwZsHtEfQ_zXUPREbr';

export const supabase = createClient(supabaseUrl, supabaseKey);