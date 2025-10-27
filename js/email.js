emailjs.init("aWaqjDLnfg-2ENw50");

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