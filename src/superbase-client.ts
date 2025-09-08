import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const superbase = createClient(supabaseUrl, supabaseAnonKey)


superbase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user)
    window.location.hash = '/community'   // redirect after login
  }
  if (event === 'SIGNED_OUT') {
    console.log('User signed out')
    window.location.hash = '/signin'      // redirect after logout
  }
})
