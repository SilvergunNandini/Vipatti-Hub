import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          location: string | null
          skills: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          location?: string | null
          skills?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          location?: string | null
          skills?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      emergencies: {
        Row: {
          id: string
          title: string
          description: string | null
          type: string
          location: string
          coordinates: any | null
          severity: string
          status: string
          reported_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          type: string
          location: string
          coordinates?: any | null
          severity: string
          status?: string
          reported_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          type?: string
          location?: string
          coordinates?: any | null
          severity?: string
          status?: string
          reported_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          name: string
          description: string | null
          type: string
          location: string
          coordinates: any | null
          available: boolean
          quantity: number | null
          contact_info: string | null
          offered_by: string | null
          urgent: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          type: string
          location: string
          coordinates?: any | null
          available?: boolean
          quantity?: number | null
          contact_info?: string | null
          offered_by?: string | null
          urgent?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          type?: string
          location?: string
          coordinates?: any | null
          available?: boolean
          quantity?: number | null
          contact_info?: string | null
          offered_by?: string | null
          urgent?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
