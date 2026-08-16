# RA Bau Lieferung — catálogo público: padrão obrigatório

Este documento é a fonte de verdade para qualquer produto novo. O padrão aplica-se ao catálogo atual em `src/catalogData.ts`, `src/additionalCatalogProducts.ts` e `src/catalog/generated/`.

## 1. Regra de admissão

Um produto só pode ser publicado quando tiver:

- ID único e estável;
- categoria correta;
- nome comercial real;
- descrição curta em alemão suíço, concreta e sem promessas não comprovadas;
- exatamente três especificações úteis;
- fabricante, referência, catálogo e página de origem;
- uma imagem exclusiva do produto, sem reutilização noutra referência;
- estado `publish` aprovado; referências incompletas ficam em `hold`.

Não publicar para aumentar volume. Um produto novo deve acrescentar uma referência, aplicação, formato, acabamento ou faixa de projeto realmente diferente.

## 2. Padrão visual

- formato obrigatório: WebP, 1200 × 900 px, proporção 4:3;
- sem cabeçalhos, rodapés, tabelas, preços, códigos de barras ou texto do catálogo;
- sem screenshots de página, margens brancas ou várias referências concorrentes;
- imagem `room`: aplicação real e identificável; usa `cover`, sem margem no cartão;
- imagem `product`: produto isolado ou imagem técnica; usa `contain` sobre fundo neutro;
- não usar uma fotografia de ambiente de outra referência;
- não usar imagens geradas por IA como prova de produto.

A qualidade deve ser comparada com as coleções aprovadas: Brescia/Onyx Opal para ambiente, Tube/Quadra para produto isolado e os cartões atuais de SPC/Vinyl e Baustelle como áreas protegidas.

## 3. Padrão de dados e texto

- alemão de mercado suíço: `ss`, `Offerte`, `Fachbetrieb`, `Freundliche Grüsse`;
- descrição entre uma e duas frases, centrada em material, aplicação e efeito;
- especificações na ordem: formato/dimensão, material/tipo, acabamento/aplicação;
- referência exata; quando varia, usar `Serie ...` ou `Referenz je Format`;
- não afirmar stock, entrega imediata, parceria oficial, exclusividade ou desconto sem prova;
- preço e disponibilidade continuam dependentes de referência, quantidade e transporte.

## 4. Importação escalável por lote

1. Copiar `catalog/catalog-batch-template.csv` e atribuir um `batch_id` no formato `AAAA-MM-nome`.
2. Preencher uma linha por referência. Usar `status=hold` enquanto dados ou imagem não estiverem aprovados.
3. Preparar cada imagem em `public-live/images/catalog-2026/<image_name>.webp` com 1200 × 900 px.
4. Classificar `image_mode` como `room` ou `product`; isto controla automaticamente `cover` ou `contain`.
5. Executar `npm run catalog:import -- catalog/<lote>.csv`.
6. Executar `npm run check:all`.
7. Rever desktop e mobile na preview, incluindo pesquisa, filtros, cartões e pedido de preço.
8. Só depois publicar e verificar `/produkte`, ativos de imagem e erros de runtime.

O importador rejeita cabeçalhos errados, campos obrigatórios vazios, categorias/segmentos inválidos, IDs repetidos, imagens ausentes e estados diferentes de `publish` ou `hold`. O validador global rejeita IDs, nomes e imagens duplicados, metadados incompletos e modo visual incoerente.

## 5. Áreas protegidas

- `SPC & Vinyl` e `Baustellenzubehör` não podem ser alterados sem pedido explícito;
- não substituir a identidade visual, cores, tipografia ou estrutura geral durante uma importação;
- não misturar alterações comerciais ou de formulário num commit de catálogo;
- qualquer lote deve ter um commit próprio e reversível.

## 6. Definição de concluído

Um lote só está concluído quando os dados, imagens, build e preview passam; a produção está `READY`; a rota pública responde; todos os novos ativos respondem; e não existem erros de runtime.
