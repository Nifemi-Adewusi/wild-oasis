import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://magvjnsrhwpghodbgpqc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZ3ZqbnNyaHdwZ2hvZGJncHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1ODcxNTgsImV4cCI6MjA3MDE2MzE1OH0._r5lgGFrhQkTyBYUoa7qwr2SfKU90g-KKyRV64ST6UI";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
