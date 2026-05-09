import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = process.argv[2] || '.';
const port = Number(process.argv[3] || process.env.PORT || 5173);
const basePath = normalizeBasePath(process.argv[4] || process.env.BASE_PATH || '/stroke-tl-dashboard');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = stripBasePath(url.pathname, basePath);
  const safePath = normalize(pathname).replace(/^\.\.(\/|\\|$)/, '');
  let filePath = join(root, safePath === '/' ? 'index.html' : safePath);

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(root, 'index.html');
  }

  response.writeHead(200, { 'Content-Type': types[extname(filePath)] || 'application/octet-stream' });
  createReadStream(filePath).pipe(response);
}).listen(port, '0.0.0.0', () => {
  const previewPath = basePath === '/' ? '/' : `${basePath}/`;
  console.log(`STROKE-TL dashboard available at http://localhost:${port}${previewPath}`);
});

function normalizeBasePath(value) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '/';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
}

function stripBasePath(pathname, base) {
  if (base === '/') return pathname;
  if (pathname === base) return '/';
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || '/';
  return pathname;
}
