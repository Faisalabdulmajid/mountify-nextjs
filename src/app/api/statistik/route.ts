import { supabase } from "@/utils/supabase/client";

export async function GET() {
  // Total Pendaki
  const { count: totalPendaki } = await supabase
    .from("users")
    .select("id", { count: "exact", head: true })
    .eq("role", "pendaki");

  // Total Kontributor Ahli
  const { count: totalKontributor } = await supabase
    .from("users")
    .select("id", { count: "exact", head: true })
    .eq("role", "kontributor");

  // Total Administrator
  const { count: totalAdmin } = await supabase
    .from("users")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin");

  // Pengguna Aktif (30 hari)
  const { count: penggunaAktif } = await supabase
    .from("users")
    .select("id", { count: "exact", head: true })
    .gte(
      "last_login",
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    );

  // Pengguna Baru (bulan ini)
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const { count: penggunaBaru } = await supabase
    .from("users")
    .select("id", { count: "exact", head: true })
    .gte("created_at", firstDay);

  // Pengguna Login Hari Ini
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count: penggunaLoginHariIni } = await supabase
    .from("users")
    .select("id", { count: "exact", head: true })
    .gte("last_login", today.toISOString());

  return new Response(
    JSON.stringify({
      totalPendaki,
      totalKontributor,
      totalAdmin,
      penggunaAktif,
      penggunaBaru,
      penggunaLoginHariIni,
    }),
    { status: 200 }
  );
}
