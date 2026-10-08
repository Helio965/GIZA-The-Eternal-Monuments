# Integração e preparação para GitHub Pages

Registro de 8 de outubro de 2026.

## Projeto preservado

A branch `codex/giza-cinematic-experience` continha cinco commits após a `main`, sem commits divergentes. O commit da `main` (`851b544`) é ancestral do projeto (`55937c5`). A comparação não identificou arquivos removidos; a licença original permaneceu idêntica. A página pública de Pull Requests mostrava zero abertos e zero fechados.

As mudanças de preparação se limitam a `.nojekyll` e documentação. O design, as fotografias, o mapa, as animações, o código da aplicação e os testes foram preservados. O acesso Git HTTPS está disponível, permitindo integração linear sem force push e mantendo a branch original. A criação de Pull Request não está disponível nesta sessão: a conexão à API do GitHub foi bloqueada pelo proxy antes de chegar à API.

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

As conexões a `api.github.com` e `helio965.github.io` retornaram bloqueio de túnel HTTP CONNECT 403. Esse resultado é uma restrição de rede do ambiente, não uma resposta do website nem prova de que o Pages está ativado ou desativado. A consulta ao GitHub pela interface pública e as operações Git funcionaram.

Os dois destinos foram acrescentados ao rascunho de configuração de rede do ambiente, preservando os destinos existentes. Salvar esse rascunho não aplica os acessos à máquina atual. Sem API acessível, a ativação do Pages exige a ação manual acima; o status de publicação e as interações no endereço público permanecem sem confirmação.
