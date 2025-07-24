import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: fetch all error reports
export async function GET(request: Request) {
  const { data, error } = await supabase.from("laporan_error").select("*");
  return new Response(JSON.stringify({ data, error }), { status: 200 });
}

// POST: create new error report
export async function POST(request: Request) {
  const formData = await request.formData();
  const judul_laporan = formData.get("judul_laporan");
  const deskripsi_laporan = formData.get("deskripsi_laporan");
  const halaman_error = formData.get("halaman_error");
  let screenshot_url = null;

  // Handle screenshot upload if present
  const screenshot = formData.get("screenshot");
  if (screenshot && typeof screenshot === "object" && screenshot.size > 0) {
    // You can integrate Supabase Storage or other storage here
    // For now, just ignore or set a dummy URL
    screenshot_url = "uploaded_url_placeholder";
  }

  const { data, error } = await supabase.from("laporan_error").insert([
    {
      judul_laporan,
      deskripsi_laporan,
      halaman_error,
      screenshot_url,
    },
  ]);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 201,
  });
}
