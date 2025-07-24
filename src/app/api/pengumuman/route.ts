import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: fetch all announcements or filter by status
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  let query = supabase.from("pengumuman").select("*");
  if (status && status !== "Semua") {
    query = query.eq("status", status);
  }
  const { data, error } = await query;
  return new Response(JSON.stringify({ data, error }), { status: 200 });
}

// POST: create new announcement
export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase.from("pengumuman").insert([body]);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 201,
  });
}

// PUT: update announcement by id
export async function PUT(request: Request) {
  const body = await request.json();
  if (!body.id) {
    return new Response(JSON.stringify({ error: "Missing announcement id" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase
    .from("pengumuman")
    .update(body)
    .eq("id", body.id);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 200,
  });
}

// DELETE: delete announcement by id
export async function DELETE(request: Request) {
  const body = await request.json();
  if (!body.id) {
    return new Response(JSON.stringify({ error: "Missing announcement id" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase
    .from("pengumuman")
    .delete()
    .eq("id", body.id);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 200,
  });
}
