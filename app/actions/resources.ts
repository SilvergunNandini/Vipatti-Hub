"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function createResourceRequest(formData: FormData) {
  const resourceType = formData.get("resource-type") as string
  const resourceName = formData.get("resource-name") as string
  const description = formData.get("description") as string
  const location = formData.get("location") as string
  const contact = formData.get("contact") as string
  const urgent = formData.get("urgent") === "on"

  const { error } = await supabase.from("resource_requests").insert([
    {
      resource_type: resourceType,
      description: `${resourceName}: ${description}`,
      location,
      contact_info: contact,
      urgent,
    },
  ])

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/resources")
  return { success: true }
}

export async function createResourceOffer(formData: FormData) {
  const name = formData.get("name") as string
  const type = formData.get("type") as string
  const description = formData.get("description") as string
  const location = formData.get("location") as string
  const contact = formData.get("contact") as string
  const quantity = Number.parseInt(formData.get("quantity") as string) || 1

  const { error } = await supabase.from("resources").insert([
    {
      name,
      type,
      description,
      location,
      contact_info: contact,
      quantity,
      available: true,
    },
  ])

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/resources")
  return { success: true }
}
