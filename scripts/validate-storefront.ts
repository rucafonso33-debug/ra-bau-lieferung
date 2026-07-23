import fs from 'node:fs';
import path from 'node:path';
import { interiorCategories } from '../src/finalData';

const errors: string[] = [];
const imageOwners = new Map<string, string>();

for (const category of interiorCategories) {
  if (category.germanTitle === 'Raumkonzepte' && category.products.length > 5) {
    errors.push(`Raumkonzepte contains ${category.products.length} entries; maximum is 5.`);
  }

  for (const product of category.products) {
    if (!product.id) errors.push(`${category.germanTitle}: product without id.`);
    if (!product.name) errors.push(`${product.id}: missing name.`);
    if (!product.reference) errors.push(`${product.id}: missing reference.`);
    if (!product.image) errors.push(`${product.id}: missing primary image.`);

    const gallery = product.gallery ?? [];
    if (gallery.length < 2) errors.push(`${product.id}: gallery must contain at least two images.`);
    const localSources = gallery.map((item) => item.src);
    if (new Set(localSources).size !== localSources.length) errors.push(`${product.id}: gallery contains duplicate src values.`);

    for (const source of localSources) {
      if (!source.startsWith('/images/')) continue;
      const absolute = path.resolve('public', source.slice(1));
      if (!fs.existsSync(absolute)) errors.push(`${product.id}: image does not exist: ${source}`);
      const owner = imageOwners.get(source);
      if (owner && owner !== product.id && category.germanTitle !== 'Raumkonzepte') {
        errors.push(`${product.id}: image reused from ${owner}: ${source}`);
      } else {
        imageOwners.set(source, product.id);
      }
    }

    if (product.brand === 'Raumkonzept' && product.format !== '1 Komplettkonzept' && product.format !== '1 Raumkonzept') {
      errors.push(`${product.id}: room concept must use a one-set format.`);
    }
  }
}

if (errors.length) {
  console.error(`Storefront validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Storefront validation passed for ${interiorCategories.reduce((sum, category) => sum + category.products.length, 0)} products.`);
