import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Server-side client (for server components and API routes)
export const createServerSupabaseClient = () => {
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || "")
}

// Client-side singleton pattern
let clientSupabaseClient: ReturnType<typeof createClient> | null = null

export const getClientSupabaseClient = () => {
  if (clientSupabaseClient === null) {
    clientSupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return clientSupabaseClient
}
