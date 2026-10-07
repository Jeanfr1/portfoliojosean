# Janela de autor / roteiro de movimento

## A experiência

Começar com uma assinatura JA pequena e conteúdo legível. A arte monumental de letras em prata acetinada revela fragmentos do retrato. Um deslocamento controlado entre os planos mostra espessura e profundidade. Conforme a pessoa rola, o enquadramento se abre até revelar o retrato; a abertura principal se transforma em uma janela retangular e entrega o primeiro projeto.

A surpresa é uma mudança coerente de composição. Ela preserva a orientação: apresentação, transição e trabalho. O efeito termina para permitir navegação direta pelo conteúdo.

## Entrada / até 1,4 s

| Tempo | Evento |
| --- | --- |
| 0,00 s | Nome, descrição e ações presentes |
| 0,00-0,40 s | Retrato aparece sob as aberturas com uma transição curta de opacidade |
| 0,20-0,90 s | Planos de grafite recuam 6-12 px; prata estabiliza |
| 0,70-1,40 s | Uma mudança discreta de luz percorre uma borda e cessa |

Nada de tela de carregamento fictícia. Se houver scroll durante a entrada, assumir o progresso de rolagem imediatamente.

## Scroll / desktop, percurso sugerido de 140 vh

| Progresso local | Cena | Ação |
| --- | --- | --- |
| 0,00-0,20 | Assinatura | JA recortado e retrato estáveis; apresentação legível |
| 0,20-0,42 | Profundidade | Planos afastam-se até 24 px; retrato desloca no máximo 18 px |
| 0,42-0,62 | Abertura | A contraforma cresce; retrato mantém geometria e enquadramento |
| 0,62-0,82 | Enquadramento | Recortes saem pelas bordas; janela retangular cresce sobre a arte |
| 0,82-1,00 | Trabalho | Retrato perde opacidade; primeiro projeto ocupa a mesma janela e encaixa na seção |

Usar a mesma imagem de retrato em todas as etapas para impedir mudanças de rosto. Arredondar o percurso das máscaras apenas quando necessário para transição de forma. Para o morph, preparar curvas com topologia compatível; o kit oferece planos independentes, não um morph vetorial pronto entre monograma e retângulo.

## Solução de produção sem 3D

Uma camada de retrato, um fundo, três planos de máscara e uma janela de projeto. Criar profundidade por pequenos offsets, sombras e perspectiva mínima. Animar a abertura por escala e deslocamento dos planos; a janela retangular surge por máscara e permanece ancorada à mesma área. Isso preserva a intenção cinematográfica sem exigir que PNGs diferentes se comportem como vídeo.

O estudo HTML entregue demonstra essa lógica com recortes vetoriais de produção. A assinatura de marca usa o PNG aprovado; o recorte monumental é um elemento editorial separado.

## Movimento entre seções

Projetos: imagem recua até 3% no hover/foco; título e contexto permanecem fixos. Seleção por click ou teclado. Mostrar uma composição principal de cada vez, sem órbitas ou carrossel automático.

Experiência: divider horizontal desenha uma única vez ao entrar; texto sobe 12 px em 450 ms. Não animar anos, percentuais ou números não fornecidos.

Processo: um traço curto acompanha a etapa em foco. Sem simular progresso real de um trabalho.

Sobre: fotografia estática; uma pequena mudança de enquadramento de até 8 px é opcional. Priorizar leitura.

Contato: reduzir a interface ao nome, à proposta de conversa e ao link. A assinatura JA aparece em escala pequena e fixa. Encerrar com serenidade.

## Responsividade e acessibilidade

Mobile: sem pin longo, sem perspectiva de câmera. Retrato e recortes numa composição estática; entradas curtas de opacidade. A janela de projeto entra logo depois do texto introdutório.

Movimento reduzido: mostrar arte final, nome, texto, ações e cases; nenhum plano móvel. Conteúdo não depende de scroll, máscaras ou animação para existir.

Pausar efeitos fora de tela e em aba oculta. Sem áudio automático, tremores, glitch em texto ou piscadas. Não inverter wheel, prender navegação ou obrigar a assistir à sequência.
