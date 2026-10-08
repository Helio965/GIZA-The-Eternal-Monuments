import { mkdir, readFile, writeFile } from 'node:fs/promises';
const files = [
  ['node_modules/gsap/dist/gsap.min.js', 'assets/vendor/gsap.min.js'],
  ['node_modules/gsap/dist/ScrollTrigger.min.js', 'assets/vendor/ScrollTrigger.min.js'],
  ['node_modules/lucide/dist/umd/lucide.js', 'assets/vendor/lucide.min.js'],
];
await mkdir('assets/vendor', { recursive: true });
for (const [source, target] of files) {
  const content = await readFile(source);
  let existing;
  try { existing = await readFile(target); } catch {}
  if (!existing?.equals(content)) await writeFile(target, content);
}
console.log('GSAP, ScrollTrigger e Lucide preparados localmente.');
