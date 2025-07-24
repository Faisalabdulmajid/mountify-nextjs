import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, ...rest } = body;
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email dan password wajib diisi." }),
        { status: 400 }
      );
    }
    // Registrasi user ke Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: rest },
    });
    if (error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
      });
    }
    return new Response(
      JSON.stringify({ message: "Registrasi berhasil.", data }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan server." }),
      { status: 500 }
    );
  }
}
