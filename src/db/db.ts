import { createClient } from "@supabase/supabase-js";

const supabaseUrl = String(process.env.REACT_APP_SUPABASE_URL);
const supabaseKey = String(process.env.REACT_APP_SUPABASE_KEY);
export const supabase = createClient(supabaseUrl, supabaseKey);
