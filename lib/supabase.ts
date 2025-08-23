import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function addToWaitlist(email: string, name: string = '', company: string = '') {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        { 
          email: email,
          name: name,
          company: company,
          created_at: new Date().toISOString(),
          role: 'user'
        }
      ])
      .select()

    if (error) {
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    return { success: false, error }
  }
}
