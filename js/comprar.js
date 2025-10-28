const icon = document.getElementById('menu-icon');
  const menu = document.getElementById('mobile-menu');

  icon.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

// =========================
// 1. Selecionar elementos de filtro
// =========================

const selectTipo = document.getElementById('tipo');           // "todos" | "carro" | "moto"
const selectCategoria = document.getElementById('categoria'); // "todas" | "sedan" | ...
const selectPreco = document.getElementById('preco');         // "todas" | "faixa1" | ...

const inputKmMin = document.getElementById('km-min');
const inputKmMax = document.getElementById('km-max');

const inputAnoMin = document.getElementById('ano-min');
const inputAnoMax = document.getElementById('ano-max');

const checkMarcas = document.querySelectorAll('.filtro-marca');

const btnBuscar = document.getElementById('btn-buscar');

const cards = document.querySelectorAll('.card');


// =========================
// 2. Funções utilitárias
// =========================

// Extrai número limpo de strings tipo "R$ 89.900", "45.000 km", etc
function extrairNumero(texto) {
    const apenasDigitos = texto.replace(/\D/g, '');
    return apenasDigitos ? parseInt(apenasDigitos, 10) : NaN;
}

// Lê um card da tela e devolve os dados que vamos filtrar
function lerInfoDoCard(card) {
    // tipo e categoria vêm da tag
    const tagEl = card.querySelector('.tag');
    const tagTexto = tagEl ? tagEl.textContent.trim().toLowerCase() : '';

    let tipo = 'carro';
    let categoria = tagTexto;

    if (tagTexto.includes('moto')) {
        tipo = 'moto';
        categoria = 'moto';
    }

    // marca = primeira palavra do h3
    const h3 = card.querySelector('h3');
    const titulo = h3 ? h3.textContent.trim() : '';
    const marca = titulo.split(' ')[0] || '';

    // preço
    const precoTexto = card.querySelector('p')?.textContent || '';
    const preco = extrairNumero(precoTexto);

    // km = primeiro .info span
    const spansInfo = card.querySelectorAll('.info span');
    const kmTexto = spansInfo[0]?.textContent || '';
    const km = extrairNumero(kmTexto);

    // ano = segundo .info span
    const anoTexto = spansInfo[1]?.textContent || '';
    const ano = extrairNumero(anoTexto);

    return {
        tipo,       // "carro" | "moto"
        categoria,  // "sedan" | "suv" | "moto" | etc.
        preco,      // número
        km,         // número
        ano,        // número
        marca       // "Volkswagen"
    };
}


// =========================
// 3. Lógica de filtro
// =========================

// Essa função roda a lógica de visibilidade de cada card, usando
// o estado ATUAL de todos os campos do formulário.
function filtrar() {
    // valores fixados na interface agora
    const filtroTipo = selectTipo.value;            // todos | carro | moto
    const filtroCategoria = selectCategoria.value;  // todas | sedan | suv ...
    const filtroPreco = selectPreco.value;          // todas | faixa1 | faixa2...

    const kmMin = extrairNumero(inputKmMin.value) || 0;
    const kmMax = extrairNumero(inputKmMax.value) || Infinity;

    const anoMin = parseInt(inputAnoMin.value) || 0;
    const anoMax = parseInt(inputAnoMax.value) || Infinity;

    const marcasSelecionadas = Array.from(checkMarcas)
        .filter(c => c.checked)
        .map(c => c.value); // ex: ["Volkswagen","Ford"]

    cards.forEach(card => {
        const info = lerInfoDoCard(card);
        let mostrar = true;

        // 1. tipo
        // Obs: Mesmo o tipo fazer parte do botão Buscar, faz sentido já aplicar
        // se a pessoa mexeu nos filtros dinâmicos? -> sua regra diz:
        // tipo só influencia quando clicar em buscar.
        // Então NÃO vamos usar filtroTipo aqui se a chamada não veio do botão Buscar.
        // Mas pra isso a gente precisa de um controle.
        // Vamos resolver mais abaixo duplicando a lógica em "filtrarDinamico".
    });
}


// Esta função é igual à filtrar() mas usa SOMENTE os campos que
// você disse que devem atualizar em tempo real: km, ano, marca.
// Ela ignora tipo, categoria, preço.
function filtrarDinamico() {
    const kmMin = extrairNumero(inputKmMin.value) || 0;
    const kmMax = extrairNumero(inputKmMax.value) || Infinity;

    const anoMin = parseInt(inputAnoMin.value) || 0;
    const anoMax = parseInt(inputAnoMax.value) || Infinity;

    const marcasSelecionadas = Array.from(checkMarcas)
        .filter(c => c.checked)
        .map(c => c.value);

    cards.forEach(card => {
        const info = lerInfoDoCard(card);
        let mostrar = true;

        // km (tempo real)
        if (!isNaN(info.km)) {
            if (info.km < kmMin || info.km > kmMax) {
                mostrar = false;
            }
        }

        // ano (tempo real)
        if (!isNaN(info.ano)) {
            if (info.ano < anoMin || info.ano > anoMax) {
                mostrar = false;
            }
        }

        // marca (tempo real)
        if (marcasSelecionadas.length > 0 && !marcasSelecionadas.includes(info.marca)) {
            mostrar = false;
        }

        // aplica visibilidade
        card.parentElement.style.display = mostrar ? 'block' : 'none';
    });
}


// Esta função é a que roda QUANDO CLICA EM "BUSCAR".
// Aqui usamos TODOS os filtros, inclusive tipo/categoria/preço.
function filtrarCompleto() {
    const filtroTipo = selectTipo.value;            // "todos" | "carro" | "moto"
    const filtroCategoria = selectCategoria.value;  // "todas" | "sedan" | ...
    const filtroPreco = selectPreco.value;          // "todas" | faixa1 | ...
    const kmMin = extrairNumero(inputKmMin.value) || 0;
    const kmMax = extrairNumero(inputKmMax.value) || Infinity;
    const anoMin = parseInt(inputAnoMin.value) || 0;
    const anoMax = parseInt(inputAnoMax.value) || Infinity;

    const marcasSelecionadas = Array.from(checkMarcas)
        .filter(c => c.checked)
        .map(c => c.value);

    // garante estado visual da categoria (travar/destravar)
    atualizarCategoriaBloqueada();

    cards.forEach(card => {
        const info = lerInfoDoCard(card);
        let mostrar = true;

        // 1. tipo
        if (filtroTipo !== 'todos' && info.tipo !== filtroTipo) {
            mostrar = false;
        }

        // 2. categoria
        // Só aplica categoria se o tipo NÃO é moto.
        if (filtroTipo !== 'moto') {
            if (filtroCategoria !== 'todas' && info.categoria !== filtroCategoria.toLowerCase()) {
                mostrar = false;
            }
        }

        // 3. preço
        if (filtroPreco !== 'todas') {
            if (filtroPreco === 'faixa1' && !(info.preco <= 50000)) {
                mostrar = false;
            }
            if (filtroPreco === 'faixa2' && !(info.preco > 50000 && info.preco <= 100000)) {
                mostrar = false;
            }
            if (filtroPreco === 'faixa3' && !(info.preco > 100000 && info.preco <= 150000)) {
                mostrar = false;
            }
            if (filtroPreco === 'faixa4' && !(info.preco > 150000 && info.preco <= 200000)) {
                mostrar = false;
            }
            if (filtroPreco === 'faixa5' && !(info.preco > 200000)) {
                mostrar = false;
            }
        }

        // 4. km
        if (!isNaN(info.km)) {
            if (info.km < kmMin || info.km > kmMax) {
                mostrar = false;
            }
        }

        // 5. ano
        if (!isNaN(info.ano)) {
            if (info.ano < anoMin || info.ano > anoMax) {
                mostrar = false;
            }
        }

        // 6. marca
        if (marcasSelecionadas.length > 0 && !marcasSelecionadas.includes(info.marca)) {
            mostrar = false;
        }

        card.parentElement.style.display = mostrar ? 'block' : 'none';
    });
}


// =========================
// 4. Bloquear/desbloquear categoria em tempo real
// =========================

function atualizarCategoriaBloqueada() {
    if (selectTipo.value === 'moto') {
        // bloquear select de categoria
        selectCategoria.disabled = true;
    } else {
        selectCategoria.disabled = false;
    }
}


// =========================
// 5. Listeners
// =========================

// 5.1 Botão Buscar -> aplica TODOS os filtros
btnBuscar.addEventListener('click', filtrarCompleto);

// 5.2 Inputs dinâmicos -> filtram em tempo real
inputKmMin.addEventListener('input', filtrarDinamico);
inputKmMax.addEventListener('input', filtrarDinamico);
inputAnoMin.addEventListener('input', filtrarDinamico);
inputAnoMax.addEventListener('input', filtrarDinamico);
checkMarcas.forEach(cb => {
    cb.addEventListener('change', filtrarDinamico);
});

// 5.3 Mudou o tipo? Só atualiza bloqueio visual da categoria.
// NÃO chama filtro automático aqui.
selectTipo.addEventListener('change', atualizarCategoriaBloqueada);

// 5.4 Opcional: ao carregar a página já garante que a categoria está no estado certo
atualizarCategoriaBloqueada();


document.querySelectorAll('.whatsapp-link').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const card = link.querySelector('.card');
        const nomeCarro = card.querySelector('h3').textContent;
        const valorCarro = card.querySelector('p').textContent;
        const numero = link.getAttribute('data-whatsapp');

        const mensagem = `Olá! Encontrei seu ${nomeCarro} anunciado por ${valorCarro} na Bestmotors e me interessei bastante. Gostaria de saber se ainda está disponível e se podemos conversar sobre ele?`;

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, '_blank');
    });
});