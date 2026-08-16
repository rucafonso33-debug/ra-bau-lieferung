import fs from 'node:fs';
import path from 'node:path';

const requiredHeaders = [
  'batch_id', 'category', 'id', 'name', 'description', 'image_name', 'image_mode',
  'spec_1', 'spec_2', 'spec_3', 'brand', 'reference', 'catalog', 'catalog_page',
  'segment', 'featured', 'status',
] as const;

const categories = new Set(['grossformat', 'keramik', 'mosaik', 'badmoebel', 'bad', 'boden', 'baustelle']);
const segments = new Set(['', 'Armaturen', 'Duschsysteme', 'Sanitärkeramik', 'Duschwannen', 'Badzubehör']);

function readWebpDimensions(file: string) {
  const buffer = fs.readFileSync(file);
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') throw new Error(`${file} is not a valid WebP file.`);
  const chunk = buffer.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
  if (chunk === 'VP8 ') return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
  if (chunk === 'VP8L') {
    const b1 = buffer[21]; const b2 = buffer[22]; const b3 = buffer[23]; const b4 = buffer[24];
    return { width: 1 + (((b2 & 0x3f) << 8) | b1), height: 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6)) };
  }
  throw new Error(`${file} uses an unsupported WebP encoding.`);
}

function parseCsv(input: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (quoted) {
      if (char === '"' && input[index + 1] === '"') { field += '"'; index += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(field.trim()); field = ''; }
    else if (char === '\n') { row.push(field.trim()); rows.push(row); row = []; field = ''; }
    else if (char !== '\r') field += char;
  }
  if (field || row.length) { row.push(field.trim()); rows.push(row); }
  if (quoted) throw new Error('CSV contains an unclosed quoted field.');
  return rows.filter((value) => value.some(Boolean));
}

const source = process.argv[2];
if (!source) throw new Error('Usage: npm run catalog:import -- catalog/my-batch.csv');
const rows = parseCsv(fs.readFileSync(path.resolve(source), 'utf8'));
const headers = rows.shift();
if (!headers || requiredHeaders.some((header, index) => headers[index] !== header)) {
  throw new Error(`CSV headers must match: ${requiredHeaders.join(',')}`);
}

const records = rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])) as Record<(typeof requiredHeaders)[number], string>);
if (!records.length) throw new Error('The batch contains no products.');
const batchId = records[0].batch_id;
if (!/^\d{4}-\d{2}-[a-z0-9-]+$/.test(batchId) || records.some((record) => record.batch_id !== batchId)) throw new Error('Use one valid batch_id per file, for example 2026-09-rubicer.');

const ids = new Set<string>();
const imageNames = new Set<string>();
for (const [index, record] of records.entries()) {
  const line = index + 2;
  for (const key of requiredHeaders.filter((header) => !['segment', 'featured'].includes(header))) {
    if (!record[key]) throw new Error(`Line ${line}: ${key} is required.`);
  }
  if (!categories.has(record.category)) throw new Error(`Line ${line}: invalid category ${record.category}.`);
  if (!segments.has(record.segment)) throw new Error(`Line ${line}: invalid segment ${record.segment}.`);
  if (!['room', 'product'].includes(record.image_mode)) throw new Error(`Line ${line}: image_mode must be room or product.`);
  if (!['publish', 'hold'].includes(record.status)) throw new Error(`Line ${line}: status must be publish or hold.`);
  if (!['', 'true', 'false'].includes(record.featured)) throw new Error(`Line ${line}: featured must be true, false or empty.`);
  if (!/^\d+$/.test(record.catalog_page) || Number(record.catalog_page) < 1) throw new Error(`Line ${line}: catalog_page must be a positive integer.`);
  if (!/^[-a-z0-9]+$/.test(record.id) || ids.has(record.id)) throw new Error(`Line ${line}: invalid or duplicate id ${record.id}.`);
  ids.add(record.id);
  if (!/^[-a-z0-9]+$/.test(record.image_name) || imageNames.has(record.image_name)) throw new Error(`Line ${line}: invalid or duplicate image_name ${record.image_name}.`);
  imageNames.add(record.image_name);
  const imagePath = path.resolve('public-live/images/catalog-2026', `${record.image_name}.webp`);
  if (record.status === 'publish') {
    if (!fs.existsSync(imagePath)) throw new Error(`Line ${line}: missing image ${imagePath}.`);
    const dimensions = readWebpDimensions(imagePath);
    if (dimensions.width !== 1200 || dimensions.height !== 900) throw new Error(`Line ${line}: image must be 1200 × 900, found ${dimensions.width} × ${dimensions.height}.`);
  }
}

const publishable = records.filter((record) => record.status === 'publish');
const moduleName = `batch_${batchId.replace(/-/g, '_')}`;
const outputDir = path.resolve('src/catalog/generated');
fs.mkdirSync(outputDir, { recursive: true });
const outputPath = path.join(outputDir, `${batchId}.ts`);
const productObjects = publishable.map((record) => ({
  id: record.id,
  category: record.category,
  name: record.name,
  description: record.description,
  image: `/images/catalog-2026/${record.image_name}.webp`,
  imageAlt: `${record.name} – ${record.image_mode === 'room' ? 'Raumanwendung' : 'Produktdarstellung'} aus dem ${record.brand}-Katalog`,
  specs: [record.spec_1, record.spec_2, record.spec_3],
  imageFit: record.image_mode === 'room' ? 'cover' : 'contain',
  visualKind: record.image_mode,
  batch: record.batch_id,
  brand: record.brand,
  reference: record.reference,
  catalog: record.catalog,
  catalogPage: Number(record.catalog_page),
  ...(record.segment ? { segment: record.segment } : {}),
  ...(record.featured === 'true' ? { featured: true } : {}),
}));
fs.writeFileSync(outputPath, `import type { Product } from '../../catalogData';\n\nexport const ${moduleName}: Product[] = ${JSON.stringify(productObjects, null, 2)};\n`);

const modules = fs.readdirSync(outputDir).filter((name) => /^\d{4}-\d{2}-[a-z0-9-]+\.ts$/.test(name)).sort();
const imports = modules.map((name) => {
  const variable = `batch_${name.replace(/\.ts$/, '').replace(/-/g, '_')}`;
  return `import { ${variable} } from './${name.replace(/\.ts$/, '')}';`;
});
const variables = modules.map((name) => `...batch_${name.replace(/\.ts$/, '').replace(/-/g, '_')}`);
fs.writeFileSync(path.join(outputDir, 'index.ts'), `${imports.join('\n')}\nimport type { Product } from '../../catalogData';\n\nexport const generatedCatalogProducts: Product[] = [${variables.join(', ')}];\n`);
console.log(`Imported ${publishable.length} published products from ${records.length} rows in batch ${batchId}.`);
