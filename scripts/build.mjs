import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
const githubPagesBasePath = '/stroke-tl-dashboard/';
const indexHtml = await readFile('index.html', 'utf8');
const deployIndexHtml = indexHtml.replace(
  'src="./src/main.js"',
  `src="${githubPagesBasePath}src/main.js"`,
);
await writeFile('dist/index.html', deployIndexHtml);
await cp('src', 'dist/src', { recursive: true });
console.log(`Built static React prototype to dist/ with base path ${githubPagesBasePath}`);
