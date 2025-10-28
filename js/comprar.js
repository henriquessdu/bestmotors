const selectTipo = document.getElementById('tipo');
const selectCategoria = document.getElementById('categoria');
const selectPreco = document.getElementById('preco');

const inputKmMin = document.getElementById('km-min');
const inputKmMax = document.getElementById('km-max');

const inputAnoMin = document.getElementById('ano-min');
const inputAnoMax = document.getElementById('ano-max');

const checkMarcas = document.querySelectorAll('.filtro-marca');

const btnBuscar = document.getElementById('btn-buscar');

const cards = document.querySelectorAll('.card');

function extrairNumero(texto) {
    const apenasDigitos = texto.replace(/\D/g, '');
    return apenasDigitos ? parseInt(apenasDigitos, 10) : NaN;
}

function lerInfoDoCard(card) {
    const tagEl = card.querySelector('.tag');
    const tagTexto = tagEl ? tagEl.textContent.trim().toLowerCase() : '';

    let tipo = 'carro';
    let categoria = tagTexto;

    if (tagTexto.includes('moto')) {
        tipo = 'moto';
        categoria = 'moto';
    }

    const h3 = card.querySelector('h3');
    const titulo = h3 ? h3.textContent.trim() : '';
    const marca = titulo.split(' ')[0] || '';

    const precoTexto = card.querySelector('p')?.textContent || '';
    const preco = extrairNumero(precoTexto);

    const spansInfo = card.querySelectorAll('.info span');
    const kmTexto = spansInfo[0]?.textContent || '';
    const km = extrairNumero(kmTexto);

    const anoTexto = spansInfo[1]?.textContent || '';
    const ano = extrairNumero(anoTexto);

    return {
        tipo,
        categoria,
        preco,
        km,
        ano,
        marca
    };
}

function filtrar() {

    const filtroTipo = selectTipo.value;
    const filtroCategoria = selectCategoria.value;
    const filtroPreco = selectPreco.value;

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
    });
}

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

        if (!isNaN(info.km)) {
            if (info.km < kmMin || info.km > kmMax) {
                mostrar = false;
            }
        }

        if (!isNaN(info.ano)) {
            if (info.ano < anoMin || info.ano > anoMax) {
                mostrar = false;
            }
        }

        if (marcasSelecionadas.length > 0 && !marcasSelecionadas.includes(info.marca)) {
            mostrar = false;
        }

        card.parentElement.style.display = mostrar ? 'block' : 'none';
    });
}

function filtrarCompleto() {
    const filtroTipo = selectTipo.value;
    const filtroCategoria = selectCategoria.value;
    const filtroPreco = selectPreco.value;
    const kmMin = extrairNumero(inputKmMin.value) || 0;
    const kmMax = extrairNumero(inputKmMax.value) || Infinity;
    const anoMin = parseInt(inputAnoMin.value) || 0;
    const anoMax = parseInt(inputAnoMax.value) || Infinity;

    const marcasSelecionadas = Array.from(checkMarcas)
        .filter(c => c.checked)
        .map(c => c.value);

    atualizarCategoriaBloqueada();

    cards.forEach(card => {
        const info = lerInfoDoCard(card);
        let mostrar = true;

        // 1. tipo
        if (filtroTipo !== 'todos' && info.tipo !== filtroTipo) {
            mostrar = false;
        }

        if (filtroTipo !== 'moto') {
            if (filtroCategoria !== 'todas' && info.categoria !== filtroCategoria.toLowerCase()) {
                mostrar = false;
            }
        }

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

        if (!isNaN(info.km)) {
            if (info.km < kmMin || info.km > kmMax) {
                mostrar = false;
            }
        }

        if (!isNaN(info.ano)) {
            if (info.ano < anoMin || info.ano > anoMax) {
                mostrar = false;
            }
        }

        if (marcasSelecionadas.length > 0 && !marcasSelecionadas.includes(info.marca)) {
            mostrar = false;
        }

        card.parentElement.style.display = mostrar ? 'block' : 'none';
    });
}

function atualizarCategoriaBloqueada() {
    if (selectTipo.value === 'moto') {
        // bloquear select de categoria
        selectCategoria.disabled = true;
    } else {
        selectCategoria.disabled = false;
    }
}

btnBuscar.addEventListener('click', filtrarCompleto);

inputKmMin.addEventListener('input', filtrarDinamico);
inputKmMax.addEventListener('input', filtrarDinamico);
inputAnoMin.addEventListener('input', filtrarDinamico);
inputAnoMax.addEventListener('input', filtrarDinamico);
checkMarcas.forEach(cb => {
    cb.addEventListener('change', filtrarDinamico);
});

selectTipo.addEventListener('change', atualizarCategoriaBloqueada);

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