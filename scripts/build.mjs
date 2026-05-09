import { copyFile, cp, mkdir, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await copyFile('index.html', 'dist/index.html');
await copyFile('index.html', 'dist/404.html');
await writeFile('dist/.nojekyll', '');
await cp('src', 'dist/src', { recursive: true });
console.log('Built GitHub Pages-ready static React prototype to dist/ for /stroke-tl-dashboard/');
