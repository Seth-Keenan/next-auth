import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });

  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    window.location.href = "/";
  } else {
    console.error("Error signing out: ", error.message)
  }
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
        console.log("Error getting session: ", error)
    } 
        
    return { data, error };
}

export const supabase = createClient( supabaseUrl, supabaseKey );