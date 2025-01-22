// Função para adicionar números e operações no visor
function adicionarValor(valor) {
  document.getElementById("visor").value += valor;
}

// Função para calcular o resultado
function calcular() {
  let visor = document.getElementById("visor");
  try {
      visor.value = eval(visor.value); // Usa o eval para calcular a expressão
  } catch (e) {
      visor.value = "Erro"; // Caso haja erro na expressão
  }
}

// Função para limpar todo o visor
function limpar() {
  document.getElementById("visor").value = "";
}

// Função para apagar o último caractere
function apagar() {
  let visor = document.getElementById("visor");
  visor.value = visor.value.slice(0, -1); // Remove o último caractere
}
