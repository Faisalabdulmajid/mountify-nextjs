import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: fetch all POI or filter by params
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tipe = searchParams.get("tipe");
  const sumber_air = searchParams.get("sumber_air");
  const id_gunung = searchParams.get("id_gunung");
  const id_jalur = searchParams.get("id_jalur");

  let query = supabase.from("poi").select("*");
  if (tipe && tipe !== "Semua") {
    query = query.eq("tipe_titik", tipe);
  }
  if (sumber_air && sumber_air !== "Semua") {
    query = query.eq("ketersediaan_air", sumber_air === "Tersedia");
  }
  if (id_gunung) {
    query = query.eq("id_gunung", id_gunung);
  }
  if (id_jalur) {
    query = query.eq("id_jalur", id_jalur);
  }
  const { data, error } = await query;
  return new Response(JSON.stringify({ data, error }), { status: 200 });
}

// POST: create new POI
export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase.from("poi").insert([body]);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 201,
  });
}

// PUT: update POI by id
export async function PUT(request: Request) {
  const body = await request.json();
  if (!body.id_titik) {
    return new Response(JSON.stringify({ error: "Missing POI id" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase
    .from("poi")
    .update(body)
    .eq("id_titik", body.id_titik);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 200,
  });
}

// DELETE: delete POI by id
export async function DELETE(request: Request) {
  const body = await request.json();
  if (!body.id_titik) {
    return new Response(JSON.stringify({ error: "Missing POI id" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase
    .from("poi")
    .delete()
    .eq("id_titik", body.id_titik);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 200,
  });
}
