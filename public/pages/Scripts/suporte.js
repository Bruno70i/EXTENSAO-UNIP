const form = document.getElementById('support-form');
form.addEventListener('submit', (e) => {
e.preventDefault();
alert('Mensagem enviada! Em breve nossa equipe retornará.');
form.reset();
});