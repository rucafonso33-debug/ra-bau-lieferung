import fs from 'node:fs';
import path from 'node:path';
import { categories, products } from '../src/catalogData';

const errors: string[] = [];
const forbidden = /\b(?:Rubicer|Gresco|Recer|Roca|Moovlux|Ramon\s+Soler|Corkart|Rubifloor|IMEX)\b/i;

if (categories.length !== 9) errors.push(`Expected 9 categories, found ${categories.length}.`);
if (products.length < 25) errors.push(`Expected at least 25 curated products, found ${products.length}.`);
if (products.filter((product) => product.featured && product.category === 'grossformat').length < 4) errors.push('Expected four featured gross-format products.');

for (const category of categories) {
  if (!category.title || !category.description || !category.image) errors.push(`${category.id}: incomplete category.`);
  if (!products.some((product) => product.category === category.id)) errors.push(`${category.id}: category has no products.`);
  if (forbidden.test(JSON.stringify(category))) errors.push(`${category.id}: public manufacturer name detected.`);
}

for (const product of products) {
  if (!product.name || !product.description || !product.image || !product.specs.length) errors.push(`${product.id}: incomplete product.`);
  if (forbidden.test(JSON.stringify(product))) errors.push(`${product.id}: public manufacturer name detected.`);
  if (process.argv.includes('--images')) {
    const absolute = path.resolve('public-live', product.image.replace(/^\//, ''));
    if (!fs.existsSync(absolute)) {
      errors.push(`${product.id}: missing image ${product.image}.`);
    } else if (fs.statSync(absolute).size === 0) {
      errors.push(`${product.id}: empty image ${product.image}.`);
    }
  }
}

if (errors.length) {
  console.error(`Storefront validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Storefront validation passed for ${categories.length} categories and ${products.length} curated products.`);
