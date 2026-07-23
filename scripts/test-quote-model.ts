import assert from 'node:assert/strict';
import { createInteriorQuoteItem, formatQuoteItem, migrateQuote, setQuoteSubstitution, toggleQuoteComponent } from '../src/lib/quote';
import type { InteriorProduct } from '../src/types';

const concept: InteriorProduct = {
  id: 'concept-test',
  name: 'Testkonzept',
  spec: 'Keramik · Möbel',
  details: 'Test',
  image: '/images/concepts/test.svg',
  brand: 'Raumkonzept',
  reference: 'Konzept Test · Visualisierung',
  format: '1 Komplettkonzept',
  finish: 'Warm',
  application: 'Badezimmer',
  box: 'Set',
  pallet: 'Projekt',
  components: ['Keramik', 'Möbel'],
  optionalComponents: ['Armatur'],
  substitutions: ['Armatur-Oberfläche'],
};

const item = createInteriorQuoteItem(concept);
assert.equal(item.unit, 'Set');
assert.equal(item.quantity, '1');
assert.equal(item.isConcept, true);
assert.deepEqual(item.selectedComponents, ['Keramik', 'Möbel']);

const withoutFurniture = toggleQuoteComponent(item, 'Möbel');
assert.deepEqual(withoutFurniture.selectedComponents, ['Keramik']);
const restored = toggleQuoteComponent(withoutFurniture, 'Möbel');
assert.deepEqual(new Set(restored.selectedComponents), new Set(['Keramik', 'Möbel']));

const withOptional = toggleQuoteComponent(restored, 'Armatur');
assert.equal(withOptional.selectedComponents?.includes('Armatur'), true);

const substituted = setQuoteSubstitution(withOptional, 'Armatur-Oberfläche', 'Alternative gewünscht');
assert.equal(substituted.selectedSubstitutions?.['Armatur-Oberfläche'], 'Alternative gewünscht');

const migrated = migrateQuote([{ ...item, selectedComponents: undefined }]);
assert.deepEqual(migrated[0].selectedComponents, ['Keramik', 'Möbel']);

const summary = formatQuoteItem(substituted, 0);
assert.match(summary, /1 Set/);
assert.match(summary, /Komponenten: Keramik, Möbel, Armatur/);
assert.match(summary, /Armatur-Oberfläche: Alternative gewünscht/);

console.log('Quote model tests passed.');
