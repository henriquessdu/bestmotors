window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.whatsapp-link').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();

            const card = link.querySelector('.card');
            const nomeCarro = card.querySelector('h3').textContent;
            const valorCarro = card.querySelector('p').textContent;
            const numero = link.getAttribute('data-whatsapp');

            const mensagem = `Olá! Encontrei seu ${nomeCarro} anunciado por ${valorCarro} no Bestmotors e me interessei bastante. Gostaria de saber se ainda está disponível e se podemos conversar sobre ele?`;

            const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

            window.open(url, '_blank');
        });
    });
});
