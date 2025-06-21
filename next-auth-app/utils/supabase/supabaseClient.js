import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });

  return { data, error };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  return { data, error };
}

export async function loginManual(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password
  })

  return { data, error };
}

export async function signupManual(email, password) {
  let { data, error } = await supabase.auth.signUp({
  email: email,
  password: password
  })

  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    window.location.href = "/";
  }
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession()
    return { data, error };
}

export const supabase = createClient( supabaseUrl, supabaseKey );