# ☕ Coffee Delivery - Prova G1 (Engenharia de Software - DSW)

Este projeto foi desenvolvido como parte da Avaliação G1 da disciplina de Desenvolvimento de Software para Web (DSW), com foco na construção de uma aplicação web de delivery de café.

---

## ✅ Funcionalidades implementadas

✔️ 1. Listagem de Produtos (1,0 ponto)

- Requisição GET à API via Axios configurado (src/serves/api.ts)
- Listagem dinâmica dos cafés com:
  - Nome
  - Descrição
  - Imagem ampliada
  - Preço unitário
  - Quantidade ajustável
- Produtos exibidos em ordem alfabética

✔️ 2. Filtro de Produtos por Categoria (1,5 ponto)

- Extração dinâmica de categorias a partir dos dados
- Filtro por categoria com atualização automática da lista
- Remoção do filtro clicando novamente na categoria
- Sem recarregamento da página

✔️ 4. Seleção e Exibição do Método de Pagamento (1,5 ponto)

- Opções disponíveis:
  - Cartão de Crédito: +3,85%
  - Cartão de Débito: +1,85%
  - Pix: 0%
- Método armazenado no estado da aplicação
- Título e taxa acessíveis em tempo real

✔️ 5. Resumo Dinâmico do Pedido no Carrinho (1,0 ponto)

- Exibição de:
  - Nome e quantidade de cada produto
  - Subtotal (quantidade × valor unitário)
  - Juros do método de pagamento
  - Total geral calculado dinamicamente
  - Método de pagamento escolhido
- Atualização automática ao alterar quantidade, remover itens ou trocar forma de pagamento

---
