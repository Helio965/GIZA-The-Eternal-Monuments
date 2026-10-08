# Validação da experiência

Execução em 8 de outubro de 2026, no ambiente de nuvem conectado ao repositório.

## Resultados finais

| Verificação | Resultado |
| --- | --- |
| `npm ci --cache /workspace/.npm-cache --no-audit --no-fund` | Instalação repetível, com integridade do lockfile. Comparação SHA-256 dos arquivos do projeto antes/depois: nenhuma mudança. |
| `npm run build` | Build estático e referências locais/imports verificados. |
| `npm test` | **31 aprovados, 0 falhas, 2 ignorados**, de 33 casos selecionados, em aproximadamente 1,2 minuto. |
| Capturas desktop, tablet e celular | Sem overflow horizontal; enquadramento e controles examinados. |

Os dois casos ignorados são cópias do teste específico de movimento reduzido nos projetos desktop/mobile convencionais. Esse teste **executou e passou** no projeto `reduced-motion`; não se trata de uma funcionalidade desativada. A configuração correta usa `contextOptions.reducedMotion` para que a preferência seja realmente aplicada ao navegador.

## Perfis e cobertura

- Desktop: Chromium, 1440 × 1000.
- Celular emulado: Chromium, 390 × 844, toque habilitado.
- Movimento reduzido: Chromium, 1440 × 1000, `prefers-reduced-motion: reduce` confirmado no teste.
- Conferência visual adicional: 768 × 1024; fotografias e pontos da Esfinge em proporção constante, controles com 44 × 44 pixels.

Os testes exercitaram os oito pontos tanto pelo desenho quanto pela lista, verificando título, descrição, fato, fontes e destaque correto. Conferiram fechamento por botão/Escape, devolução de foco, zoom de 100% a 300%, limites, reset e teclado do mapa; quatro hotspots; abas por setas/Home/End; comparação com Órion e ressalva de hipótese; âncoras, menu móvel, progresso, fontes locais e documentos de créditos.

Os testes de resiliência simularam bibliotecas de animação indisponíveis, falhas em fotografias e no SVG, e troca da preferência de movimento com a página aberta. Informação histórica e controles continuaram disponíveis, sem exceções de JavaScript. Os testes normais não registraram erros críticos no console nem imagens locais faltantes.

O runner Playwright criou capturas e relatórios do próprio conjunto executado em `test-results/` e `playwright-report/`, ignorados pelo Git. Falhas iniciais foram diagnosticadas e resolvidas antes da execução final: documentação de mídia ainda ausente, seletor de teste do menu incompatível com sua mudança de nome acessível e configuração de emulação de movimento reduzido no teste. Nenhuma assertiva foi desativada para obter aprovação.

## Limites da validação

Não foram executados testes em Safari, Firefox ou aparelhos físicos Android/iPhone, benchmark universal de 60 fps ou auditoria acadêmica integral. Os links institucionais foram conferidos quanto à estrutura e ao destino; respostas HTTP de suas páginas não foram confirmadas porque o proxy bloqueou a consulta. A validação diz respeito à máquina atual, ao site servido por HTTP e aos arquivos distribuídos — não comprova deploy público nem restauração em uma nova tarefa de nuvem.
