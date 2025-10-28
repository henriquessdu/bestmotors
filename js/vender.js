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

  const mensagem = 
`Olá! Eu sou ${nome} e quero vender um ${marca} ${modelo} (${categoria}).

Detalhes do veículo:
- Preço desejado: R$ ${preco}
- Quilometragem: ${km}
- Ano: ${ano}
- Localização: ${localizacao}

Pode me retornar? Posso enviar fotos do veículo também.`;

  const numeroLoja = "5515991676893";

  const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, '_blank');
});