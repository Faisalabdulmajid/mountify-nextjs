import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: fetch all mountains or filter by query param
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nama = searchParams.get("nama");
  const lokasi = searchParams.get("lokasi");
  const minKetinggian = searchParams.get("minKetinggian");
  const maxKetinggian = searchParams.get("maxKetinggian");
  const jalur = searchParams.get("jalur"); // "Punya Jalur" | "Belum Ada Jalur" | "Semua"

  let query = supabase.from("gunung").select("*, jalur_pendakian(count)");

  if (nama) {
    query = query.ilike("nama_gunung", `%${nama}%`);
  }
  if (lokasi) {
    query = query.ilike("lokasi_administratif", `%${lokasi}%`);
  }
  if (minKetinggian) {
    query = query.gte("ketinggian_puncak_mdpl", Number(minKetinggian));
  }
  if (maxKetinggian) {
    query = query.lte("ketinggian_puncak_mdpl", Number(maxKetinggian));
  }

  // Jalur filter: count jalur_pendakian
  const { data, error } = await query;
  let filtered = data;
  if (jalur === "Punya Jalur") {
    filtered = filtered.filter((g) => g.jalur_pendakian?.length > 0);
  } else if (jalur === "Belum Ada Jalur") {
    filtered = filtered.filter(
      (g) => !g.jalur_pendakian || g.jalur_pendakian.length === 0
    );
  }
  return new Response(JSON.stringify({ data: filtered, error }), {
    status: 200,
  });
}

// POST: create new mountain
export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase.from("gunung").insert([body]);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 201,
  });
}

// PUT: update mountain by id
export async function PUT(request: Request) {
  const body = await request.json();
  if (!body.id_gunung) {
    return new Response(JSON.stringify({ error: "Missing mountain id" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase
    .from("gunung")
    .update(body)
    .eq("id_gunung", body.id_gunung);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 200,
  });
}

// DELETE: delete mountain by id
export async function DELETE(request: Request) {
  const body = await request.json();
  if (!body.id_gunung) {
    return new Response(JSON.stringify({ error: "Missing mountain id" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase
    .from("gunung")
    .delete()
    .eq("id_gunung", body.id_gunung);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 200,
  });
}
