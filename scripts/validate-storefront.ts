import fs from 'node:fs';
import path from 'node:path';
import { categories, products } from '../src/catalogData';

const errors: string[] = [];
const forbidden = /\b(?:Rubicer|Gresco|Recer|Roca|Moovlux|Ramon\s+Soler|Corkart|Rubifloor|IMEX)\b/i;

if (categories.length !== 9) errors.push(`Expected 9 categories, found ${categories.length}.`);
if (products.length < 25) errors.push(`Expected at least 25 curated products, found ${products.length}.`);
if (products.filter((product) => product.featured && product.category === 'grossformat').length < 4) errors.push('Expected four featured gross-format products.');

const duplicateIds = products.filter((product, index) => products.findIndex((candidate) => candidate.id === product.id) !== index);
const duplicateNames = products.filter((product, index) => products.findIndex((candidate) => candidate.name.trim().toLocaleLowerCase('de-CH') === product.name.trim().toLocaleLowerCase('de-CH')) !== index);
const duplicateImages = products.filter((product, index) => products.findIndex((candidate) => candidate.image === product.image) !== index);
if (duplicateIds.length) errors.push(`Duplicate product IDs: ${duplicateIds.map((product) => product.id).join(', ')}.`);
if (duplicateNames.length) errors.push(`Duplicate product names: ${duplicateNames.map((product) => product.name).join(', ')}.`);
if (duplicateImages.length) errors.push(`Repeated product images: ${duplicateImages.map((product) => product.image).join(', ')}.`);

for (const category of categories) {
  if (!category.title || !category.description || !category.image) errors.push(`${category.id}: incomplete category.`);
  const categoryProducts = products.filter((product) => product.category === category.id);
  if (categoryProducts.length < 6) errors.push(`${category.id}: expected at least 6 products, found ${categoryProducts.length}.`);
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
