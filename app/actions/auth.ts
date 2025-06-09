"use server"

import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const location = formData.get("location") as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  if (data.user) {
    // Create user profile
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        email,
        name,
        location,
      },
    ])

    if (profileError) {
      return { error: profileError.message }
    }
  }

  redirect("/")
}

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/")
}
