import fs from 'node:fs';

const file = 'src/App.tsx';
let source = fs.readFileSync(file, 'utf8');

const replacements = [
  ['font-display text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl', 'font-display text-[2.6rem] font-black leading-[.98] tracking-[-.05em] sm:text-6xl lg:text-7xl'],
  ['font-display text-5xl font-black tracking-[-.05em]">{title}', 'font-display text-[2.5rem] font-black leading-[1.02] tracking-[-.045em] sm:text-5xl">{title}'],
  ['className="fixed inset-0 z-[80] overflow-y-auto bg-[#071927]/75 p-3 sm:p-6"', 'className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-[#071927]/75 p-0 sm:p-6"'],
  ['className="mx-auto grid max-w-5xl bg-white lg:grid-cols-[1.05fr_.95fr]"', 'className="mx-auto min-h-full grid max-w-5xl bg-white sm:min-h-0 sm:rounded-[20px] lg:grid-cols-[1.05fr_.95fr]"'],
  ['className="h-11 w-24 border border-[#ccd7dc] px-3 text-sm"', 'className="h-11 w-24 border border-[#ccd7dc] px-3 text-base sm:text-sm"'],
  ['className="mt-3 min-h-20 w-full border border-[#ccd7dc] p-3 text-sm"', 'className="mt-3 min-h-20 w-full border border-[#ccd7dc] p-3 text-base sm:text-sm"'],
  ['className="h-11 border border-[#ccd7dc] bg-white px-3 text-sm font-normal"', 'className="h-11 border border-[#ccd7dc] bg-white px-3 text-base font-normal sm:text-sm"'],
  ['className="h-12 border border-[#ccd7dc] bg-white px-3 text-sm"', 'className="h-12 border border-[#ccd7dc] bg-white px-3 text-base sm:text-sm"'],
  ['className="min-h-28 border border-[#ccd7dc] bg-white p-3 text-sm"', 'className="min-h-28 border border-[#ccd7dc] bg-white p-3 text-base sm:text-sm"'],
  ['<div className="min-h-screen overflow-x-hidden bg-[#f3f5f6]">', '<div className="min-h-screen overflow-x-hidden bg-[#f3f5f6] [padding-bottom:env(safe-area-inset-bottom)]">'],
  ['className="flex min-h-14 w-full items-center justify-between bg-[#10293e] px-4 text-left text-white shadow-2xl"', 'className="flex min-h-14 w-full items-center justify-between rounded-2xl border border-white/10 bg-[#10293e]/96 px-4 text-left text-white shadow-2xl backdrop-blur"'],
];

for (const [from, to] of replacements) {
  if (!source.includes(from)) {
    console.warn(`Pattern not found: ${from.slice(0, 70)}`);
    continue;
  }
  source = source.replaceAll(from, to);
}

fs.writeFileSync(file, source);
console.log('Applied final mobile and modal polish.');
