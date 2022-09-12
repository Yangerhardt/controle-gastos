const placeholderHistorico = document.querySelector("#placeholder-historico");
let id = 0;
let transacoes = JSON.parse(localStorage.getItem("itens")) || [];

transacoes.forEach((transacao) => {
  criaElemento(transacao.nome, transacao.valor, transacao);
});
atualizarSaldo(transacoes);
if (transacoes.length == 0) {
  placeholderHistorico.innerHTML = "Não há transações";
}

document.addEventListener("submit", (evento) => {
  evento.preventDefault();

  placeholderHistorico.innerHTML = "";

  const nome = document.querySelector("#nome");
  const valor = document.querySelector("#valor");

  if (Number(valor.value) == NaN ) { //faltou validar quando não for inserido um valor
    document.querySelector(".erro").innerHTML = "Valor inválido"
  } else {
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
  }
});

function criaElemento(nome, valor, transacao) {
  const novoItem = document.createElement("div");
  novoItem.classList.add("transacao-container");
  document.querySelector("#historico").appendChild(novoItem);

  const deletaImagem = document.createElement("button");
  deletaImagem.innerHTML = "x";
  deletaImagem.classList.add("deleta-btn");
  novoItem.appendChild(deletaImagem);

  const transacaoContainer = document.createElement("section");
  Number(transacao.valor) > 0
    ? transacaoContainer.classList.add("transacao-pos")
    : transacaoContainer.classList.add("transacao-neg");
  novoItem.appendChild(transacaoContainer);

  const nomeTransacao = document.createElement("p");
  nomeTransacao.innerHTML = transacao.nome;
  transacaoContainer.appendChild(nomeTransacao);

  const valorTransacao = document.createElement("p");
  valorTransacao.classList.add("valor-transacao");

  transacao.valor > 0
    ? (valorTransacao.innerHTML = "R$ " + transacao.valor)
    : (valorTransacao.innerHTML = "- R$ " + -1 * transacao.valor);
  transacaoContainer.appendChild(valorTransacao);

  removeTransacao(deletaImagem, novoItem, transacao);
}

function removeTransacao(deletaImagem, novoItem, transacao) {
  deletaImagem.addEventListener("click", () => {
    novoItem.remove();
    if (document.querySelector(".transacao-container") == null) {
      placeholderHistorico.innerHTML = "Não há transações";
    }
    // Splice para retirar os elementos do array
    transacoes.forEach((elemento) => {
      if (elemento === transacao) {
        transacoes.splice(transacao.id, 1)
      }
    });
    // para resetar os id's de cada objeto do array
    transacoes.forEach((elemento,index) => {
      elemento.id = index
    })

    atualizarSaldo(transacoes);
  });
}

function atualizarSaldo(entrada) {
  let saldoFinal = 0;
  let receitaFinal = 0;
  let gastoFinal = 0;
  entrada.forEach((elemento) => {
    saldoFinal += Number(elemento.valor);
    if (elemento.valor > 0) {
      receitaFinal += Number(elemento.valor);
    } else if (elemento.valor < 0) {
      gastoFinal += Number(elemento.valor);
    }
  });
  document.querySelector(".saldo-num").innerHTML = `R$ ${saldoFinal}`;
  document.querySelector(".receita").innerHTML = `R$ ${receitaFinal}`;
  document.querySelector(".gasto").innerHTML = `R$ ${gastoFinal}`;
  localStorage.setItem("itens", JSON.stringify(entrada));
}
