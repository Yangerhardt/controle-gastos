const botao = document.querySelector(".botao");
const historico = document.querySelector("#historico");
const saldo = document.querySelector(".saldo-num");
const receita = document.querySelector(".receita");
const gasto = document.querySelector(".gasto");
let saldoFinal = 0;
let receitaFinal = 0;
let gastoFinal = 0;
transacoes = [];

document.addEventListener("submit", (evento) => {
  evento.preventDefault();

  document.querySelector("#placeholder-historico").innerHTML = "";

  const nome = document.querySelector("#nome");
  const valor = document.querySelector("#valor");

  const valorStr = valor.value.toString()
  if (valorStr.indexOf(",") > 0) {
    const valorCorreto = valorStr.replace(",", ".")
    valor.value = Number(valorCorreto)
  }  

    const transacao = {
    "nome" : nome.value,
    "valor": valor.value
  }

  transacoes.push(transacao)

  console.log(transacoes)

  criaElemento(nome, valor);

  atualizarSaldo(valor);

  nome.value = "";
  valor.value = "";
});

function criaElemento(nome, valor) {
  const novoItem = document.createElement("div");
  novoItem.classList.add("transacao-container");
  historico.appendChild(novoItem);

  const deletaImagem = document.createElement("button");
  deletaImagem.innerHTML = "x"
  deletaImagem.classList.add("deleta-btn")
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
    novoItem.remove()
    if (document.querySelector(".transacao-container") == null) {
      document.querySelector("#placeholder-historico").innerHTML = "Não há transações";
    }
  })
}

function atualizarSaldo(entrada) {
  saldoFinal += Number(entrada.value);
  saldo.innerHTML = `R$ ${saldoFinal}`;

  if (Number(entrada.value) > 0) {
    receitaFinal += Number(entrada.value);
    receita.innerHTML = `R$ ${receitaFinal}`;
  } else {
    gastoFinal += Number(entrada.value);
    gasto.innerHTML = `R$ ${gastoFinal}`;
  }
}
