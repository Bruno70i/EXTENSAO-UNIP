// db.js
// Módulo que exporta a instância de conexão com o SQLite

var sqlite3 = require('sqlite3').verbose();

// Abre (ou cria) o arquivo database.db
var db = new sqlite3.Database('./database.db', function(err) {
    if (err) {
        console.log('Erro ao conectar com o banco de dados: ' + err.message);
    } else {
        console.log('Conectado ao banco SQLite com sucesso.');
    }
});

module.exports = db;
