
function adicionarValor(valor) {
  document.getElementById("visor").value += valor;
}

function calcular() {
  let visor = document.getElementById("visor");
  try {
      visor.value = eval(visor.value); 
  } catch (e) {
      visor.value = "Erro"; 
  }
}

function limpar() {
  document.getElementById("visor").value = "";
}

function apagar() {
  let visor = document.getElementById("visor");
  visor.value = visor.value.slice(0, -1);
}
