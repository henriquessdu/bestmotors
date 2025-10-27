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

emailjs.init("aWaqjDLnfg-2ENw50");

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-suporte');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_495lwzh', 'template_s8ig5ek', this)
      .then(function(response) {
        console.log('E-mail enviado!', response.status, response.text);
        alert('Mensagem enviada com sucesso! 🚀');
        form.reset();
      }, function(error) {
        console.error('Erro ao enviar e-mail:', error);
        alert('Ops! Ocorreu um erro ao enviar. Tente novamente mais tarde.');
      });
  });
});