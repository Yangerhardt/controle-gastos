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
/*     novoItem.remove();
    if (document.querySelector(".transacao-container") == null) {
      document.querySelector("#placeholder-historico").innerHTML =
        "Não há transações";
    } */
    transacoes.splice(transacoes[0].id, 1); // COMO PEGO A COORDENADA DE CADA OBJETO DENTRO DO ARRAY? COMO SEI QUAL É O ID DE CADA ELEMENTO?
    console.log(transacoes);
    console.log(id)
    atualizarSaldo(valor);
  });
}

function atualizarSaldo(entrada) {
  saldoFinal = 0
  transacoes.forEach((elemento) => {
    saldoFinal += Number(elemento.valor);
  });
  saldo.innerHTML = `R$ ${saldoFinal}`;


  if (Number(entrada.value) > 0) {
    receitaFinal += Number(entrada.value);
    receita.innerHTML = `R$ ${receitaFinal}`;
  } else {
    gastoFinal += Number(entrada.value);
    gasto.innerHTML = `R$ ${gastoFinal}`;
  }
}
