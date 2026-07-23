import fs from 'node:fs';
const file = 'src/App.tsx';
let source = fs.readFileSync(file, 'utf8');
source = source.replace(/(?:import \{ useQuote \} from '\.\/hooks\/useQuote';\n)+/, "import { useQuote } from './hooks/useQuote';\n");
fs.writeFileSync(file, source);
