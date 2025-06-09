import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const location = searchParams.get("location")

  const supabase = createServerSupabaseClient()

  let query = supabase.from("emergencies").select("*")

  if (type) {
    query = query.eq("type", type)
  }

  if (location) {
    query = query.ilike("location", `%${location}%`)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ emergencies: data })
}

export async function POST(request: Request) {
  const supabase = createServerSupabaseClient()

  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("emergencies")
      .insert([
        {
          title: body.title,
          description: body.description,
          type: body.type,
          location: body.location,
          severity: body.severity,
          coordinates: body.coordinates,
          reported_by: body.userId,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ emergency: data[0] }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
