# Créditos e licenças de mídia

A licença MIT do código deste repositório **não substitui as licenças das fotografias, das fontes e das bibliotecas**. As versões adaptadas das fotografias mantêm suas condições de atribuição e compartilhamento pela mesma licença.

## Fotografias distribuídas

| Arquivos | Obra e autor | Licença | Alterações |
| --- | --- | --- | --- |
| `giza-hero.webp`, `giza-hero-640.webp`, `pyramids-panorama.webp` | **All Gizah Pyramids**, Ricardo Liberato | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) | Redimensionamento e conversão WebP. Enquadramento, gradientes e tratamento de cor via CSS. |
| `sphinx.webp`, `sphinx-1000.webp`, `sphinx-640.webp` | **Egypt.Giza.Sphinx**, Hamish2k, 2005 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | Redimensionamento e conversão WebP. Nenhuma estrutura acrescentada ou removida. |

Fontes originais:

- [All Gizah Pyramids — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:All_Gizah_Pyramids.jpg)
- [Egypt.Giza.Sphinx — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Egypt.Giza.Sphinx.jpg)

### Proveniência nesta sessão

O Wikimedia retornou 403 no túnel do proxy, impedindo a consulta direta às páginas de licença. Foram usados espelhos públicos com atribuição explícita:

- Ricardo Liberato: fotografia obtida em `lampd-2157/youtube`, caminho `assets/egypt-pyramid/01-all-gizah-pyramids-jpg.jpg`. O manifesto do mesmo projeto identifica autor, origem Commons, CC BY-SA 2.0 e URL da licença. A cópia disponível tem 1280 × 851.
- Hamish2k: [commit de proveniência e licença](https://github.com/sermons/img/commit/4642d56576f906c74f1f3bebd79033f3a22ef70c), que identifica “Great Sphinx of Giza and Pyramid of Khafre, Egypt”, © 2005 Hamish2k, CC BY-SA 3.0. A fotografia foi obtida do [arquivo original nesse commit](https://raw.githubusercontent.com/sermons/img/4642d56576f906c74f1f3bebd79033f3a22ef70c/orig/Egypt_Giza_Sphinx.jpg), com 2272 × 1704, antes da otimização para 1700 × 1275.

A licença foi conferida nos metadados desses espelhos; a confirmação direta no Commons permanece pendente. Essa distinção evita apresentar uma consulta à origem como realizada. As atribuições são também exibidas pelo botão “Créditos de imagens” no rodapé.

## Capturas do sistema

Os arquivos PNG em `docs/screenshots/` foram capturados do site em execução no Chromium em 8 de outubro de 2026. A versão desktop usa largura de 1440 pixels; a altura varia para enquadrar cada seção. A versão para celular usa viewport de 390 × 844 pixels com emulação de toque. A preferência de movimento reduzido foi ativada para registrar telas estáveis. As capturas mostram a interface real, incluindo a seleção de Quéops no mapa e da aba “O trabalho”; não são imagens geradas ou montagens.

| Capturas | Fotografias incorporadas e licenças |
| --- | --- |
| `01-abertura-desktop.png`, `03-painel-historico.png`, `06-abertura-celular.png` | **All Gizah Pyramids**, Ricardo Liberato — [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/), com as origens e a proveniência descritas acima. |
| `04-esfinge.png` | **Egypt.Giza.Sphinx**, Hamish2k, 2005 — [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), com as origens e a proveniência descritas acima. |
| `02-mapa-interativo.png`, `05-engenharia.png` | Interface e diagramas próprios, sob a licença MIT do projeto. |

As fotografias aparecem enquadradas com a interface, textos e tratamento visual do site, e são reproduzidas em PNG nas capturas. Suas adaptações conservam as respectivas licenças CC BY-SA; a licença MIT da interface não substitui essas condições.

## Fontes tipográficas

Cormorant Garamond (regular, itálico e semibold) e Inter (regular, medium e semibold), obtidas dos pacotes oficiais `@fontsource/cormorant-garamond@5.3.0` e `@fontsource/inter@5.3.0`, com arquivos WOFF2 locais. A integridade SHA-512 dos arquivos de pacote foi verificada. Subconjunto latino com os caracteres do português.

[SIL Open Font License](../assets/fonts/cormorant-garamond-LICENSE.txt); licença de [Inter](../assets/fonts/inter-LICENSE.txt).

## Bibliotecas

- GSAP 3.13.0 e ScrollTrigger: [GSAP Standard License](https://gsap.com/standard-license/). Cabeçalhos de licença preservados nos arquivos distribuídos. Não é necessária ferramenta paga para executar o site.
- Lucide 0.468.0: ISC, com partes derivadas de Feather/MIT. Aviso completo em `assets/vendor/LUCIDE-LICENSE.txt`.
- Playwright: Apache 2.0, dependência de desenvolvimento; não é enviado ao navegador.

## SVG e vídeo

Os diagramas, mapa, favicon e marca geométrica foram criados para este projeto e seguem a licença do código. A geometria é didática, não um levantamento arqueológico exato. O vídeo enviado e as fotografias visíveis no chat são referências de direção de arte; não foram incluídos sem arquivos e metadados de uso apropriados.
