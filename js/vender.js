document.getElementById('form-vender').addEventListener('submit', function (event) {
  event.preventDefault();

  const nome         = document.getElementById('nome').value.trim();
  const categoria    = document.getElementById('categoria').value.trim();
  const marca        = document.getElementById('marca').value.trim();
  const modelo       = document.getElementById('modelo').value.trim();
  const preco        = document.getElementById('preco').value.trim();
  const km           = document.getElementById('km').value.trim();
  const ano          = document.getElementById('ano').value.trim();
  const localizacao  = document.getElementById('localizacao').value.trim();

  // monta mensagem de WhatsApp
  const mensagem = 
`Olá! Eu sou ${nome} e quero vender um ${marca} ${modelo} (${categoria}).

Detalhes do veículo:
- Preço desejado: R$ ${preco}
- Quilometragem: ${km}
- Ano: ${ano}
- Localização: ${localizacao}

Pode me retornar? Posso enviar fotos do veículo também.`;

  // número da sua loja
  const numeroLoja = "15991676893"; // <-- TROCAR PELO SEU NÚMERO (só dígitos, c/ DDD)

  // monta URL com texto codificado
  const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`;

  // abre o WhatsApp
  window.open(url, '_blank');
});