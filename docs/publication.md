# Integração e preparação para GitHub Pages

Registro de 8 de outubro de 2026.

## Projeto preservado

A branch `codex/giza-cinematic-experience` continha cinco commits após a `main`, sem commits divergentes. O commit da `main` (`851b544`) é ancestral do projeto (`55937c5`). A comparação não identificou arquivos removidos; a licença original permaneceu idêntica. A página pública de Pull Requests mostrava zero abertos e zero fechados.

As mudanças de preparação se limitam a `.nojekyll` e documentação. O design, as fotografias, o mapa, as animações, o código da aplicação e os testes foram preservados.

A integração inicial foi concluída por avanço linear (fast-forward), de `851b544` para `7a2814f`, usando Git HTTPS: naquele momento a API para criar Pull Request estava bloqueada pela rede. A confirmação por `git ls-remote`, novo fetch e página pública do GitHub mostrou a `main` e a branch original no mesmo commit, com `index.html`, `css/`, `js/`, `assets/`, `docs/`, testes e `.nojekyll`. Os cinco commits do projeto e a licença original foram preservados; não houve force push, exclusão de branch nem reescrita de histórico.

## Validação executada

| Comando | Resultado |
| --- | --- |
| `npm ci --cache /workspace/.npm-cache --no-audit --no-fund` | Instalação concluída a partir do lockfile; sem mudanças nos arquivos rastreados. |
| `npm run build` | Build estático concluído; referências locais e imports verificados. |
| `npm test -- --config /tmp/giza-publish-tests.config.mjs` | **31 aprovados, 0 falhas, 2 ignorados**, em aproximadamente 1,3 minuto. |

O arquivo de configuração temporário apenas apontou os testes e o servidor para a porta 4193, pois a porta padrão 4173 não respondia com HTTP válido. A suíte, os três perfis, as assertivas e as opções do navegador foram mantidos. Os dois casos ignorados são as cópias do teste específico de movimento reduzido nos perfis convencionais; esse teste executou e passou no perfil apropriado.

A suíte verifica imagens, CSS, JavaScript, mapa e oito painéis, zoom, teclado, quatro detalhes da Esfinge, engenharia, GSAP/ScrollTrigger, navegação móvel, foco e comportamento quando recursos estão indisponíveis. Esses resultados validam o website por HTTP neste ambiente; não representam uma verificação do endereço público.

Uma verificação adicional serviu a raiz do projeto no subdiretório `/GIZA-The-Eternal-Monuments/`, reproduzindo o prefixo do Pages. Passou nos perfis desktop e celular: fotografias e três folhas CSS carregadas, GSAP/ScrollTrigger ativos, mapa e painel de Quéops, detalhe da Estela do Sonho, aba “O trabalho”, navegação móvel e `.nojekyll` com resposta 200. Nenhum erro de JavaScript, console ou caminho HTTP foi registrado nesses dois perfis.

## Estratégia única de publicação

**GitHub Pages pela branch `main`, pasta `/(root)`**. O site estático já funciona na raiz e contém as fotografias, fontes e bibliotecas locais. `.nojekyll` evita a transformação pelo Jekyll. Não é necessário versionar `dist/` nem adicionar um workflow próprio de publicação.

Para habilitar, abra [Settings → Pages](https://github.com/Helio965/GIZA-The-Eternal-Monuments/settings/pages), escolha **Deploy from a branch → main → /(root) → Save**. O GitHub cria e gerencia o processo de publicação dessa estratégia; acompanhe seu resultado em [Actions](https://github.com/Helio965/GIZA-The-Eternal-Monuments/actions).

Endereço previsto após publicação: `https://helio965.github.io/GIZA-The-Eternal-Monuments/`.

## Limites e pendências externas

As conexões a `api.github.com` e `helio965.github.io` inicialmente retornaram bloqueio de túnel HTTP CONNECT 403. Os dois destinos foram acrescentados ao rascunho de rede, preservando os destinos existentes. Depois, os acessos à API e ao endereço público passaram a funcionar; isso permitiu distinguir o estado real da publicação do bloqueio de transporte inicial.

A consulta autenticada ao repositório confirmou `has_pages: false`. A tentativa de criar Pages com `source.branch: main`, `source.path: /` e `build_type: legacy` foi recusada com **HTTP 403 — `Resource not accessible by integration`**. A permissão administrativa da conta no repositório não amplia os escopos da credencial da integração; a criação de Pages exige permissões que essa credencial não possui.

O endereço público respondeu **HTTP 404** com o título “Site not found · GitHub Pages” e a mensagem “There isn't a GitHub Pages site here”. A API de Actions mostrou zero execuções. Portanto, não há publicação concluída nem teste das interações em um website público: os resultados funcionais acima são locais.

A pendência é habilitar Pages com sua conta em **Settings → Pages → Deploy from a branch → main → /(root) → Save**. Um workflow alternativo não remove a falta de permissão para habilitar Pages. Não foram introduzidas duas estratégias concorrentes nem solicitadas credenciais em texto no chat.
