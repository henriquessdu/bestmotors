# Bestmotors

Bestmotors é um site de compra e venda de carros e motos, criado como projeto acadêmico para a disciplina de Web Design do Centro Universitário Facens. O foco do projeto é simular a experiência de um marketplace automotivo moderno: busca de veículos com filtros, formulário para anunciar seu veículo e suporte ao usuário.

## Índice
- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Páginas do Projeto](#páginas-do-projeto)
- [Front-end e Responsividade](#front-end-e-responsividade)
- [Como Executar Localmente](#como-executar-localmente)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Melhorias Futuras](#melhorias-futuras)
- [Créditos](#créditos)

---

## Visão Geral

A proposta do Bestmotors é oferecer uma interface clara e direta para quem quer:
- Encontrar carros ou motos dentro de critérios específicos (preço, quilometragem, ano, marca etc.).
- Anunciar um veículo para vender.
- Entender como financiar a compra.
- Pedir suporte.

Todo o layout foi pensado para parecer um produto real, com navegação fixa no topo, cards de veículos e formulários funcionais.

---

## Funcionalidades

### 🔎 Filtro de veículos (página inicial)
- Filtro por tipo de veículo (`carro` ou `moto`).
- Filtro de categoria (SUV, Picape, Sedan, Hatch, Esportivo etc.).
- Faixas de preço pré-definidas (até 50k, 50k–100k, etc.).
- Filtros dinâmicos por:
  - Quilometragem mínima e máxima.
  - Ano mínimo e máximo.
  - Marcas selecionadas (checkboxes).
- Atualização visual dos resultados:
  - Os cards que não passam nos filtros são ocultados dinamicamente via JavaScript.

- Bloqueio automático da categoria quando o tipo selecionado é “moto”, para não permitir categorias de carro nesse caso.

### 📞 Contato via WhatsApp direto no anúncio
Cada card de veículo permite gerar automaticamente uma mensagem personalizada e abrir o WhatsApp do vendedor com o texto pronto, incluindo nome do carro e preço.

### 🏍 Venda seu veículo (formulário de venda)
Página `vender.html`:
- Formulário com:
  - Nome do vendedor
  - Categoria do veículo
  - Marca / Modelo
  - Preço desejado
  - Quilometragem
  - Ano
  - Localização
- Ao enviar, o script monta uma mensagem com todas as informações e abre o WhatsApp para envio, simulando o fluxo “quero anunciar meu carro/moto”.

### 💸 Financiamento
Página `financiamento.html`:
- Explica para o usuário como funciona o financiamento de carro/moto e orienta o processo passo a passo (entrada, aprovação, parcelas).
- Conteúdo informativo, didático e acessível para o usuário que nunca financiou um veículo.

### 🏢 Sobre nós
Página `sobre.html`:
- Texto institucional sobre a Bestmotors:
  - Missão
  - Propósito
  - Contexto do projeto acadêmico
- Apresenta a plataforma como algo construído com seriedade e foco em experiência do usuário.

### 💬 Central de ajuda
Página `ajuda.html`:
- Formulário para suporte com Nome, E-mail, Assunto e Mensagem.
- Integração com [EmailJS](https://www.emailjs.com/) no front-end para envio do formulário sem backend.

### 📱 Menu mobile colapsável
- No mobile, o menu de navegação vira um ícone “hambúrguer”.
- Ao tocar, o menu abre/fecha adicionando ou removendo a classe `.show`.

---

## Páginas do Projeto

- `index.html`  
  Página principal. Mostra:
  - Header fixo com navegação.
  - Seção de busca com filtros.
  - Cards de veículos, com imagem, marca/modelo, preço, ano e km.
  - Botões para contato via WhatsApp.
  - Slideshow de destaque com botões de navegação anterior/próximo.

- `vender.html`  
  Formulário para o usuário enviar os dados do veículo que quer vender e solicitar avaliação.

- `financiamento.html`  
  Conteúdo explicando como financiar um veículo pela plataforma e quais passos seguir.

- `ajuda.html`  
  Formulário de suporte usando EmailJS para contato.

- `sobre.html`  
  Texto institucional e apresentação do projeto.

---

## Front-end e Responsividade

### Estilo visual
- Paleta baseada em variáveis CSS definidas em `style.css`, incluindo:
  - `--cor-principal: #004fff` (azul da identidade visual)
  - `--cor-background: #edf7f6`
  - `--cor-preto` e `--cor-preto-sub` para texto principal e texto secundário

- Componentes como cards de veículo, caixas de filtro, cabeçalho e formulários usam:
  - `border-radius: 12px`
  - `box-shadow` leve para dar profundidade
  - Bordas suaves com `--cor-borda`

- Header fixo no topo com `position: fixed`, sombra e borda inferior, ocupando 100% da largura.

- Tipografia com a fonte `"Montserrat", sans-serif` importada do Google Fonts (todas as páginas).

### Layout / Grid
- A classe `.container` centraliza e define larguras máximas:
  - `1200px` em desktop
  - `768px` em tablet
  - `320px` em mobile  
  Isso é controlado via `grid.css`.

- A listagem de veículos (`.cards-grid`) usa CSS Grid com 2 colunas no desktop e cai para 1 coluna no mobile.

### Responsividade
Responsividade é tratada em `responsivo.css` (media queries fornecidas):

- Tablet (`min-width: 768px` e `max-width: 1219px`):
  - Ajusta o padding do topo das seções `.pesquisa`, `.vender`, `.texto` para 125px (por causa do header fixo).
  - Reduz larguras de selects e botões.
  - Diminui o tamanho dos títulos (`font-size: 2.5em`).
  - Esconde elementos com classe `.tablet`.
  - Ajusta `.footer-container` para `width: 768px`.

- Mobile (`max-width: 767px`):
  - Empilha os selects e botão de busca da área de pesquisa em uma coluna (`flex-direction: column; gap: 10px; max-width: 320px`).
  - Ajusta tamanhos de fonte dos títulos e textos para leitura confortável em tela pequena.
  - Header troca o menu `.desktop` pelo menu `.mobile` (ícone hamburguer).
  - O grid de cards vira 1 coluna.
  - As imagens `.foto img` limitam altura em 125px pra manter proporção visual.
  - O footer vira coluna centralizada, com texto menor e espaçamento reduzido.

Isso garante que toda a navegação (busca, cards, formulários) funcione bem tanto em celular quanto em desktop.

---

## Como Executar Localmente

O projeto é totalmente front-end. Não precisa de servidor backend.

1. Baixe/clonar este repositório.
2. Abra o arquivo `index.html` diretamente no navegador.

Para testar todas as páginas:
- `index.html` — página inicial
- `vender.html` — anunciar veículo
- `financiamento.html` — instruções de financiamento
- `ajuda.html` — central de ajuda
- `sobre.html` — sobre o projeto

> Obs.: A parte de envio de mensagens (WhatsApp e EmailJS) depende de serviços externos:
> - WhatsApp: abre um link `wa.me` com mensagem preenchida.
> - EmailJS: exige configurar seu `service_id`, `template_id` e `public_key` no JavaScript.

---

## Tecnologias Utilizadas

### Estrutura
- **HTML5 semântico**  
  Uso de `<header>`, `<nav>`, `<section>`, `<footer>`, atributos `aria-label` e `title` em links de navegação para acessibilidade.

- **CSS3**  
  - `normalize.css`: normalização cross-browser.
  - `reset.css`: remoção de estilos padrão (margens, listas, tamanhos de fonte).
  - `grid.css`: sistema simples de container fluido com breakpoints desktop/tablet/mobile.
  - `style.css`: tema visual (cores, tipografia, espaçamentos, cards, filtros, slideshow, etc.).
  - `responsivo.css`: media queries para tablet e mobile, controle de layout responsivo.

- **JavaScript puro (Vanilla JS)**
  - `comprar.js`:
    - Lê conteúdo de cada card (preço, km, ano, marca, tipo).
    - Aplica filtros de busca combinando vários critérios de uma vez (tipo, categoria, preço, km, ano, marca).
    - Atualiza a exibição escondendo/mostrando os cards de veículo, sem recarregar a página.
    - Bloqueia dinamicamente a `<select>` de categoria quando o tipo selecionado é “moto”.
    - Gera mensagem automática de interesse e abre conversa no WhatsApp.

  - `vender.js`:
    - Captura os dados do formulário de venda (`vender.html`) e gera uma mensagem pronta pro WhatsApp com todas as informações inseridas pelo dono do veículo.

  - `ajuda.js`:
    - Conecta o formulário de suporte com a biblioteca `EmailJS` para envio de e-mail direto do front-end.

  - `slide.js`:
    - Controla o slideshow de veículos/imagens em destaque na home (`index.html`), alternando visibilidade das `.slide` e aplicando a classe `.ativo`.

  - `script.js`:
    - Controla o menu mobile. Ao clicar no ícone hambúrguer (`#menu-icon`), alterna a classe `.show` em `#mobile-menu`, exibindo/escondendo as opções de navegação.

### UI / Interação
- Botões arredondados (`border-radius: 12px`) com `box-shadow` no hover.
- Cards de veículo com efeito hover:
  - Sombra mais forte.
  - Zoom suave na imagem (`transform: scale(1.1)`).
- Slideshow com botões circulares (`.btn-prev`, `.btn-next`) posicionados com `position: absolute`.

---

## Melhorias Futuras

Próximos passos planejados:
1. **Persistência de dados com banco de dados real**  
   - Integrar um backend leve e um banco de dados (por exemplo, Supabase) para armazenar:
     - Anúncios enviados pelo formulário de venda.
     - Mensagens enviadas pela área de ajuda.
     - Lista de veículos anunciados (em vez de cards estáticos no HTML).

2. Autenticação básica de usuários (login do vendedor) e área “Meus Anúncios”.

3. Página individual do veículo com mais fotos e descrição detalhada.

---

## Créditos

Projeto desenvolvido como parte da disciplina de Web Design do Centro Universitário Facens.

Bestmotors é um projeto acadêmico com foco em boas práticas de layout, responsividade, acessibilidade básica e simulação de funcionalidades comuns em marketplaces automotivos modernos.

---
