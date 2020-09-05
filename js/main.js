let nome = '';

function helloWorld() {
  for (let i = 3; i > 0; i--) {
    console.log(i);
  }
  console.log('...');
  console.log('Hello World!');
}
helloWorld();

function inserirOuAtualizarNome() {
  nome = localStorage.getItem('nome');
  if (nome) {
    if (confirm(`${nome}, deseja trocar o seu nome?`)) {
      nome = prompt('Digite seu novo nome:');
      localStorage.setItem('nome', nome);
    }
  } else {
    nome = prompt('Cadastre seu nome:');
    localStorage.setItem('nome', nome);
  }
  document.querySelector('#nome').innerHTML = `Bem vindo, ${nome}!`;
}

inserirOuAtualizarNome();