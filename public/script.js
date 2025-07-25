// script.js

// 1) Função para buscar e exibir usuários
function carregarUsuarios() {
  fetch('/users')
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      var lista = document.getElementById('lista-usuarios');
      lista.innerHTML = '';
      data.forEach(function(usuario) {
        var li = document.createElement('li');
        li.textContent = usuario.id + ': ' + usuario.name + ' (' + usuario.email + ')';
        lista.appendChild(li);
      });
    })
    .catch(function(err) {
      console.error('Erro ao buscar usuários:', err);
    });
}

// 2) Função para cadastrar novo usuário
function configurarFormulario() {
  var form = document.getElementById('form-cadastro');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(form);
    var nome = formData.get('name');
    var email = formData.get('email');

    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: nome, email: email })
    })
      .then(function(res) {
        if (!res.ok) {
          return res.json().then(function(err) {
            throw new Error(err.erro || err.error);
          });
        }
        return res.json();
      })
      .then(function(novoUsuario) {
        alert('Usuário ' + novoUsuario.name + ' cadastrado com ID ' + novoUsuario.id);
        form.reset();
        carregarUsuarios();
      })
      .catch(function(err) {
        alert('Erro ao cadastrar: ' + err.message);
      });
  });
}

// 3) Ao carregar a página, executa as funções
document.addEventListener('DOMContentLoaded', function() {
  carregarUsuarios();
  configurarFormulario();
});
