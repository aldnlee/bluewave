import { createClient } from '@supabase/supabase-js';

export function getSupabase(runtimeEnv?: Record<string, any>) {
  const supabaseUrl = 
    runtimeEnv?.PUBLIC_SUPABASE_URL || 
    import.meta.env.PUBLIC_SUPABASE_URL;
    
  const supabaseAnonKey = 
    runtimeEnv?.PUBLIC_SUPABASE_ANON_KEY || 
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL atau Anon Key belum dikonfigurasi!');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}