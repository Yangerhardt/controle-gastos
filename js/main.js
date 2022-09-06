const botao = document.querySelector(".botao");
const historico = document.querySelector("#historico");
const saldo = document.querySelector(".saldo-num");
const receita = document.querySelector(".receita");
const gasto = document.querySelector(".gasto");
let saldoFinal = 0;
let receitaFinal = 0;
let gastoFinal = 0;
let teste = 0;
let id = 0;
transacoes = [];

document.addEventListener("submit", (evento) => {
  evento.preventDefault();

  document.querySelector("#placeholder-historico").innerHTML = "";

  const nome = document.querySelector("#nome");
  const valor = document.querySelector("#valor");

  const valorStr = valor.value.toString();
  if (valorStr.indexOf(",") > 0) {
    const valorCorreto = valorStr.replace(",", ".");
    valor.value = Number(valorCorreto);
  }

  const transacao = {
    id: id++,
    nome: nome.value,
    valor: valor.value,
  };

  transacoes.push(transacao);

  criaElemento(nome, valor, transacao);

  atualizarSaldo(transacoes);

  nome.value = "";
  valor.value = "";
});

function criaElemento(nome, valor, transacao) {
  const novoItem = document.createElement("div");
  novoItem.classList.add("transacao-container");
  historico.appendChild(novoItem);

  const deletaImagem = document.createElement("button");
  deletaImagem.innerHTML = "x";
  deletaImagem.classList.add("deleta-btn");
  novoItem.appendChild(deletaImagem);

  const transacaoContainer = document.createElement("section");
  Number(valor.value) > 0
    ? transacaoContainer.classList.add("transacao-pos")
    : transacaoContainer.classList.add("transacao-neg");
  novoItem.appendChild(transacaoContainer);

  const nomeTransacao = document.createElement("p");
  nomeTransacao.innerHTML = nome.value;
  transacaoContainer.appendChild(nomeTransacao);

  const valorTransacao = document.createElement("p");
  valor.value > 0
    ? (valorTransacao.innerHTML = "R$ " + valor.value)
    : (valorTransacao.innerHTML = "- R$ " + -1 * valor.value);
  transacaoContainer.appendChild(valorTransacao);

  // Deletar a transação do histórico -- faltou mudar os valores de saldos
  deletaImagem.addEventListener("click", () => {
    novoItem.remove();
    if (document.querySelector(".transacao-container") == null) {
      document.querySelector("#placeholder-historico").innerHTML =
        "Não há transações";
    }
    transacoes.forEach((elemento) => {
      if (elemento === transacao) {
        transacoes.splice(transacao.id, 1);
      }
    });
    if (transacoes.length < 1) {
      id = 0; 
    }
    atualizarSaldo(transacoes);
  });
}

function atualizarSaldo(entrada) {
  saldoFinal = 0;
  receitaFinal = 0
  gastoFinal = 0
  entrada.forEach((elemento) => {
    saldoFinal += Number(elemento.valor);
    if (elemento.valor > 0) {
      receitaFinal += Number(elemento.valor)
    } else if (elemento.valor < 0) {
      gastoFinal += Number(elemento.valor)
    } 
  });
  saldo.innerHTML = `R$ ${saldoFinal}`;
  receita.innerHTML = `R$ ${receitaFinal}`
  gasto.innerHTML = `R$ ${gastoFinal}`
  }