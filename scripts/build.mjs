import { cp, mkdir, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
const files = ['index.html', 'css', 'js', 'assets', 'LICENSE'];
await mkdir('dist', { recursive: true });
for (const file of files) await cp(file, path.join('dist', file), { recursive: true });
const html = await readFile('index.html', 'utf8');
for (const match of html.matchAll(/(?:src|href)="((?:assets|css|js)\/[^"?#]+)"/g)) {
  await stat(match[1]);
}
async function checkModules(dir) {
  for (const name of await readdir(dir)) {
    if (!name.endsWith('.js')) continue;
    const file = path.join(dir, name);
    const code = await readFile(file, 'utf8');
    for (const m of code.matchAll(/from ['"](\.\.?\/[^'"]+)['"]/g)) {
      await stat(path.resolve(dir, m[1]));
    }
  }
}
await checkModules('js');
console.log('Build estático criado em dist/; referências HTML e imports locais verificados.');
