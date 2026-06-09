export async function onRequestPost(context) {
  try {
    // Parse incoming JSON body
    const body = await context.request.json();

    // Example unpacker logic (replace with your own)
    const { sessions } = body;
    if (!sessions || !Array.isArray(sessions)) {
      return new Response(
        JSON.stringify({ error: "Invalid request: sessions missing" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Simulate unpacking process
    const unpacked = sessions.map((s, i) => ({
      id: i + 1,
      original: s,
      unpacked: `Unpacked: ${s}`,
    }));

    return new Response(JSON.stringify({ result: unpacked }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
