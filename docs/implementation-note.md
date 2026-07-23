# Final architecture

The production storefront uses a normal React entry (`src/App.tsx`) with URL-based routing, one persistent quote state, structured catalogue data in `src/finalData.ts`, central business configuration and automated storefront validation. The earlier generated `App.part*.txt` and Vite string-patch architecture are removed from execution.
