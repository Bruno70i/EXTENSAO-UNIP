// app.js
var express = require('express');
var app = express();

// Habilita JSON no corpo das requisições
app.use(express.json());

// uma forma do servidor  mostrar os arquivos estáticos, tipo os arquivos HTML CSS e JavaScript antes de processar as outras requisições
app.use(express.static('public'));

// Importa as rotas de users
var usersRouter = require('./controllers/users');

// Monta o router em '/users'
app.use('/users', usersRouter);

// Rota raiz apenas para teste de vida
app.get('/', function(req, res) {
    res.send('API está no ar!');
});

// Inicia o servidor
app.listen(3000, function() {
    console.log('Servidor rodando em http://localhost:3000');
});

// novo comentario teste
// novo comentario teste 2