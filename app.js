const express = require('express'); // é o framework HTTP.
const sqlite3 = require('sqlite3').verbose(); // é o driver que vai falar com seu arquivo .db.

// Inicia a instância do Express, Isso dá o objeto app, que controla rotas, middlewares e o servidor em si.
const app = express();


// Abre a conexão com o banco
const db = new sqlite3.Database('./database.db', function(errorConexao) {
  if (errorConexao) {
    console.error('Erro ao abrir o DB:', errorConexao.message);
  } else {
    console.log('Conectado ao SQLite em database.db');
  }
});

// habilita o middleware, Permitindo o Express acessar e entender o .json
app.use(express.json());

// req = requisicao
// res = respostra
app.get('/', function(requisicao, resposta) {
  resposta.send('Hello world!');
});


app.post('/pessoa', function(req, resp){
  console.log(req.body);
  resp.json({
    "statucCode": 200
  })
})


app.listen(3000, function() {
  console.log('Servidor rodando em http://localhost:3000');
});

