import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://tqsaqcznsqlgeuatlcwq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxc2FxY3puc3FsZ2V1YXRsY3dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NDk1MjgsImV4cCI6MjA4ODUyNTUyOH0.IexTw3A3L9nBef9pE29RWzbQee5biKsi6nKJRatkvJc';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Warning: SUPABASE_URL or SUPABASE_KEY is missing in environment variables.');
}


export const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
