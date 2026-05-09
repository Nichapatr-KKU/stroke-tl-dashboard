import { access, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const distDir = 'dist';
const requiredFiles = ['index.html', 'src/main.js', 'src/styles.css'];

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

const indexHtml = await readFile('index.html', 'utf8');
const hasRelativeScript = indexHtml.includes('src="./src/main.js"');
const hasRelativeStylesheet = indexHtml.includes('href="./src/styles.css"');

if (!hasRelativeScript || !hasRelativeStylesheet) {
  throw new Error('index.html must use relative ./src/main.js and ./src/styles.css asset paths.');
}

await writeFile(`${distDir}/index.html`, indexHtml);
await writeFile(`${distDir}/.nojekyll`, '');
await cp('src', `${distDir}/src`, { recursive: true });

await Promise.all(requiredFiles.map((file) => access(`${distDir}/${file}`)));

console.log(`Built static React prototype to ${distDir}/ with GitHub Pages-compatible relative paths.`);
console.log('Verified required files:');
for (const file of requiredFiles) {
  console.log(`- ${file}`);
}
