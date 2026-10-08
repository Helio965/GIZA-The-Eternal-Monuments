# Implementação

## Arquitetura

Site estático: HTML semântico, três folhas CSS e módulos JavaScript nativos. As dependências GSAP, ScrollTrigger, Lucide e as fontes são locais; a página não precisa buscar CDN em execução. Não há backend, autenticação, banco ou gerador de vídeo obrigatório.

- `main.js`: inicialização, âncoras/foco, navegação móvel, progresso, diálogos, abas e comparação artística com Órion.
- `animations.js`: contextos `gsap.matchMedia`, introdução, ScrollTriggers, parallax da fotografia, máscaras, linhas SVG e pin breve condicionado ao espaço disponível.
- `historical-data.js`: informações dos oito lugares, referências e posições no esquema.
- `giza-map.js`: atlas, câmera, marcadores/lista, teclado, zoom, reset, arraste desktop, painel nativo `dialog` e fallback do SVG.

## Acessibilidade e movimento

Navegação por âncoras move também o foco de leitura. Diálogos nativos conservam foco, fecham por Escape e devolvem foco ao acionador. As abas implementam setas, Home e End. Controles do mapa oferecem nomes acessíveis; a lista permite explorar locais sem depender do desenho ou da rolagem.

`prefers-reduced-motion` mantém toda a leitura e as interações sem pin, scrub ou introduções. O conteúdo não começa oculto por CSS. `gsap.matchMedia` reverte os contextos ao trocar a preferência; a limpeza é chamada na saída da página. O mapa usa `ResizeObserver` para recalcular o enquadramento. Arraste touch foi omitido para conservar a rolagem vertical: zoom, lista e seleção funcionam por toque.

## Mídia e desempenho

Imagens WebP, `srcset` no hero e na Esfinge, carregamento tardio abaixo da primeira tela, fontes WOFF2 locais, preload do hero e da fonte principal. A fotografia e os hotspots da Esfinge movem-se na mesma camada e mantêm uma proporção constante. Não há partículas, Canvas ou cálculos geométricos pesados por evento de scroll. O progresso é atualizado via `requestAnimationFrame`.

Quando GSAP não estiver disponível, o conteúdo e as interações continuam funcionando. Se o SVG não carregar, o atlas usa um esquema simplificado e preserva os oito painéis. Mídia indisponível mantém texto alternativo e fundo visual. Fotos ausentes em um painel não bloqueiam sua informação.

## Publicação

`npm run build` verifica referências HTML/imports e copia HTML, CSS, JavaScript, assets, documentos e licença para `dist/`. Publicar o conteúdo de `dist/` em qualquer servidor estático. Os caminhos são relativos, inclusive quando a página fica no subdiretório de um projeto do GitHub Pages.

Abrir `index.html` via `file://` não é suportado: módulos ES e fetch do SVG exigem HTTP. Para desenvolvimento, `npm run dev` usa o servidor HTTP do Python na porta 4173. O servidor do ambiente de desenvolvimento não é um deploy público.
