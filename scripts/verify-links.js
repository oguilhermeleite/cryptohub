const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const issues = [];

const anchors = [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => match[0]);
const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
const externalLinks = anchors.filter((tag) => /\bhref=["']https?:\/\//i.test(tag));
const partnerLinks = anchors.filter((tag) => /\bcard-final-btn-(?:primary|secondary)\b/i.test(tag));

for (const tag of externalLinks) {
  const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1] || '';
  if (/\btarget=["']_blank["']/i.test(tag) && !/\brel=["'][^"']*\bnoopener\b/i.test(tag)) {
    issues.push(`Link externo sem rel="noopener": ${href}`);
  }
}

for (const tag of partnerLinks) {
  const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1] || '';
  if (!href) issues.push(`Botão de parceiro sem href: ${tag}`);
  if (href.startsWith('http://')) issues.push(`Botão de parceiro usa HTTP: ${href}`);
}

for (const tag of images) {
  if (!/\balt=["'][^"']*["']/i.test(tag)) {
    issues.push(`Imagem sem texto alternativo: ${tag}`);
  }
}

const localReferences = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)]
  .map((match) => match[1].split('?')[0])
  .filter((reference) => reference && !/^(?:https?:|#|data:|mailto:|tel:|javascript:)/i.test(reference));

for (const reference of new Set(localReferences)) {
  if (!fs.existsSync(path.join(root, reference))) {
    issues.push(`Referência local inexistente: ${reference}`);
  }
}

console.log(`Links externos: ${externalLinks.length}`);
console.log(`Botões de parceiros: ${partnerLinks.length}`);
console.log(`Imagens: ${images.length}`);

if (issues.length) {
  console.error(`\n${issues.length} problema(s) encontrado(s):`);
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exitCode = 1;
} else {
  console.log('\nAuditoria estrutural concluída sem problemas.');
}
