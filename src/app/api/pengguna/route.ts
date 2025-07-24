import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: fetch all users or filter by query param (?role=admin)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  let query = supabase.from("users").select("*");
  if (role) {
    query = query.eq("role", role);
  }
  const { data, error } = await query;
  return new Response(JSON.stringify({ data, error }), { status: 200 });
}

// POST: create new user
export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase.from("users").insert([body]);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 201,
  });
}

// PUT: update user by id
export async function PUT(request: Request) {
  const body = await request.json();
  if (!body.id) {
    return new Response(JSON.stringify({ error: "Missing user id" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase
    .from("users")
    .update(body)
    .eq("id", body.id);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 200,
  });
}

// DELETE: delete user by id
export async function DELETE(request: Request) {
  const body = await request.json();
  if (!body.id) {
    return new Response(JSON.stringify({ error: "Missing user id" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", body.id);
  return new Response(JSON.stringify({ data, error }), {
    status: error ? 400 : 200,
  });
}
