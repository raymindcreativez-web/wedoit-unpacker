// Vercel Serverless Function: proxies requests to the Gemini API.
// The API key is read from the server-side env var GEMINI_API_KEY and is
// never exposed to the browser.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: 'Server is missing the GEMINI_API_KEY environment variable.',
    });
    return;
  }

  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      }
    );

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: `Proxy request failed: ${err.message}` });
  }
}
