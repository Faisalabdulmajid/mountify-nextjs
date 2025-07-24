import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: fetch all trails or filter by query param
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nama = searchParams.get("nama");
  const id_gunung = searchParams.get("id_gunung");
  const status = searchParams.get("status");
  const kesulitan = searchParams.get("kesulitan");

  let query = supabase.from("jalur_pendakian").select("*");
  if (nama) {
    query = query.ilike("nama_jalur", `%${nama}%`);
  }
  if (id_gunung && id_gunung !== "Semua") {
    query = query.eq("id_gunung", id_gunung);
  }
  if (status && status !== "Semua") {
    query = query.eq("status_jalur", status);
  }
  if (kesulitan && kesulitan !== "Semua") {
    // Assume kesulitan is "Mudah", "Menengah", "Sulit" and map to skala
    if (kesulitan === "Mudah") query = query.lte("kesulitan_skala", 3);
    else if (kesulitan === "Menengah")
      query = query.gte("kesulitan_skala", 4).lte("kesulitan_skala", 7);
    else if (kesulitan === "Sulit") query = query.gte("kesulitan_skala", 8);
  }
  const { data, error } = await query;
  return new Response(JSON.stringify({ data, error }), { status: 200 });
}

// POST: create new trail
export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase.from("jalur_pendakian").insert([body]);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 201,
  });
}

// PUT: update trail by id
export async function PUT(request: Request) {
  const body = await request.json();
  if (!body.id_jalur) {
    return new Response(JSON.stringify({ error: "Missing trail id" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase
    .from("jalur_pendakian")
    .update(body)
    .eq("id_jalur", body.id_jalur);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 200,
  });
}

// DELETE: delete trail by id
export async function DELETE(request: Request) {
  const body = await request.json();
  if (!body.id_jalur) {
    return new Response(JSON.stringify({ error: "Missing trail id" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase
    .from("jalur_pendakian")
    .delete()
    .eq("id_jalur", body.id_jalur);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 200,
  });
}
