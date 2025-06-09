import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const available = searchParams.get("available")

  const supabase = createServerSupabaseClient()

  let query = supabase.from("resources").select("*")

  if (type) {
    query = query.eq("type", type)
  }

  if (available) {
    query = query.eq("available", available === "true")
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ resources: data })
}

export async function POST(request: Request) {
  const supabase = createServerSupabaseClient()

  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("resources")
      .insert([
        {
          name: body.name,
          description: body.description,
          type: body.type,
          location: body.location,
          available: body.available,
          quantity: body.quantity,
          contact_info: body.contactInfo,
          offered_by: body.userId,
          urgent: body.urgent || false,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ resource: data[0] }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
