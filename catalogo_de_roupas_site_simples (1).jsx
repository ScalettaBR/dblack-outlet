<!DOCTYPE html>
<html lang="pt-br">
<head>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"></script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>D'Black Outlet</title>

<style>
body { margin:0; font-family: Arial; background:#000; color:#fff; }
header { display:flex; align-items:center; gap:10px; padding:15px; }
header img { width:50px; border-radius:50%; }
h1 span { color:#facc15; }

.container { display:grid; grid-template-columns: 1fr 2fr 1fr; gap:20px; padding:20px; }
.card { background:#18181b; padding:10px; border-radius:10px; }
button { background:#facc15; border:none; padding:8px; cursor:pointer; }
input { width:100%; margin:5px 0; padding:5px; }

.produto img { width:100%; border-radius:10px; }
</style>
</head>

<body>

<header>
<img src="logo.png">
<h1>D'BLACK <span>OUTLET</span></h1>
</header>

<div style="padding:0 20px;">
<button onclick="filtrar('Todos')">Todos</button>
<button onclick="filtrar('Calçados')">Calçados</button>
<button onclick="filtrar('Camisas')">Camisas</button>
<button onclick="filtrar('Bermudas')">Bermudas</button>
<button onclick="filtrar('Calças')">Calças</button>
</div>

<div class="container">

<!-- ADMIN -->
<div class="card">
<h3>Adicionar Produto</h3>
<input id="nome" placeholder="Nome">
<input id="marca" placeholder="Marca">
<input id="preco" placeholder="Preço">
<input id="imagem" placeholder="URL da imagem">
<input id="categoria" placeholder="Categoria">
<button onclick="addProduto()">Adicionar</button>
</div>

<!-- PRODUTOS -->
<div>
<h2>Produtos</h2>
<div id="lista"></div>
</div>

<!-- CARRINHO -->
<div class="card">
<h3>Carrinho</h3>
<div id="carrinho"></div>
<h4 id="total"></h4>
<button onclick="finalizar()">Finalizar no WhatsApp</button>
</div>

</div>

<script>
  // Configure a firebase
const firebaseConfig = {
  apiKey: "AIzaSyC_vXz5dXrBRgZN3KciVKvyNGnZ47sNh7w",
  authDomain: "d-black-outlet-d8f3c.firebaseapp.com",
  projectId: "d-black-outlet-d8f3c",
  storageBucket: "d-black-outlet-d8f3c.firebasestorage.app",
  messagingSenderId: "816810445158",
  appId: "1:816810445158:web:00a782dfb4e19a497aa0a7",
  measurementId: "G-C0JE81FTBL"
};

// INICIALIZAR FIREBASE
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let carrinho = [];
let filtroAtual = 'Todos';

function salvar(){
  localStorage.setItem('produtos', JSON.stringify(produtos));
}

function addProduto(){
  const p = {
    nome: nome.value,
    marca: marca.value,
    preco: Number(preco.value),
    imagem: imagem.value,
    categoria: categoria.value
  };
  produtos.push(p);
  salvar();
  render();
}

function filtrar(cat){
  filtroAtual = cat;
  render();
}

function addCarrinho(i){
  carrinho.push(produtos[i]);
  renderCarrinho();
}

function render(){
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  produtos.forEach((p,i)=>{
    if(filtroAtual!='Todos' && p.categoria!=filtroAtual) return;

    lista.innerHTML += `
    <div class='card produto'>
      <img src='${p.imagem}'>
      <h4>${p.nome}</h4>
      <small>${p.marca}</small>
      <p>R$ ${p.preco}</p>
      <button onclick='addCarrinho(${i})'>Adicionar</button>
    </div>`;
  });
}

function renderCarrinho(){
  let html='';
  let total=0;

  carrinho.forEach(p=>{
    total+=p.preco;
    html+=`<p>${p.nome} - R$ ${p.preco}</p>`;
  });

  document.getElementById('carrinho').innerHTML = html;
  document.getElementById('total').innerText = 'Total: R$ '+total;
}

function finalizar(){
  let msg = 'Pedido:%0A';
  carrinho.forEach(p=>{
    msg += `• ${p.nome} - R$ ${p.preco}%0A`;
  });

  window.open(`https://wa.me/5542999296088?text=${msg}`);
}

render();
</script>

</body>
</html>
