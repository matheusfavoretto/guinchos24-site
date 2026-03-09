# BrincaFesta - Site para GitHub Pages

Site de aluguel de brinquedos para festa infantil, pronto para publicar no GitHub Pages.

## Estrutura

- `index.html` → página principal
- `style.css` → visual premium do site
- `script.js` → catálogo, busca, cálculos e redirecionamento para WhatsApp

## Recursos incluídos

- catálogo com 20+ brinquedos
- busca por nome, categoria ou descrição
- escolha do brinquedo
- datas de retirada e devolução
- cálculo automático:
  - 40% na reserva
  - 60% na devolução
  - até 2 dias de aluguel
  - 10% de taxa ao dia após o segundo dia
- finalização do pedido pelo WhatsApp
- layout mais moderno e profissional

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta.
3. No GitHub, abra **Settings**.
4. Clique em **Pages**.
5. Em **Branch**, escolha **main** e pasta **/** root.
6. Salve.
7. Aguarde o link do site ser gerado.

## WhatsApp

O número do WhatsApp está configurado no arquivo `script.js`:

```js
const whatsappNumber = '5519988604840';
```

Se quiser trocar, altere esse número no arquivo.
