// script.js

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário

    const nome = document.querySelector('[name="nome"]').value;
    const email = document.querySelector('[name="email"]').value;
    const mensagem = document.querySelector('[name="mensagem"]').value;

    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos!');
    } else {
        alert('Mensagem enviada com sucesso!');
        // Aqui você pode adicionar lógica para enviar o formulário (por exemplo, via API)
    }
});
