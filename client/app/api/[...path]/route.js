const MU_API_BASE = 'https://api.muapi.ai';

async function proxyRequest(request, { params }) {
  const apiKey = process.env.MU_API_KEY;
  if (!apiKey) {
    return Response.json({ detail: 'MU_API_KEY not configured' }, { status: 500 });
  }

  const { path } = await params;
  const url = new URL(request.url);
  const targetUrl = `${MU_API_BASE}/${path.join('/')}${url.search}`;

  const options = {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
  };

  if (request.method !== 'GET' && request.method !== 'DELETE') {
    const body = await request.text();
    if (body) options.body = body;
  }

  try {
    const response = await fetch(targetUrl, options);
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    return Response.json(data, { status: response.status });
  } catch (err) {
    return Response.json({ detail: err.message }, { status: 502 });
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const DELETE = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
