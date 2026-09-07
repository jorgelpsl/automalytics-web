// Host-based rewrite for the gym demo, matched only on "/".
//
// This has to be Edge Middleware rather than a vercel.json rewrite: this is a
// static deployment, and when the requested path matches an existing file
// (like "/" -> index.html), Vercel serves that file directly and never
// evaluates rewrites for that path — a rewrite targeting "/" can't win
// against the static file already sitting there. Middleware runs earlier,
// before that filesystem match happens, so it's the only way to give
// demo-gym.automalytics.com different content at "/" than the main site.
//
// No framework and no package.json here, so this stays framework-agnostic:
// plain Web APIs only, no @vercel/edge import. Setting the
// x-middleware-rewrite response header is the underlying mechanism that
// higher-level helpers (NextResponse.rewrite, @vercel/edge's rewrite()) both
// compile down to.
export const config = { matcher: '/' };

export default function middleware(request) {
  const host = request.headers.get('host') || '';
  if (host === 'demo-gym.automalytics.com') {
    const url = new URL(request.url);
    url.pathname = '/demo/gimnasio.html';
    return new Response(null, { headers: { 'x-middleware-rewrite': url.toString() } });
  }
}
