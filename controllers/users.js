// controllers/users.js
// Define todas as rotas CRUD para o recurso "users"

var express = require('express');
var router = express.Router();
var db = require('../db');  // importa o objeto db de db.js

// 1) Listar todos os usuários
router.get('/', function(req, res) {
    var sql = 'SELECT * FROM users';
    db.all(sql, [], function(err, rows) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(rows);
    });
});

// 2) Buscar um usuário por ID
router.get('/:id', function(req, res) {
    var idUsuario = req.params.id;
    var sql = 'SELECT * FROM users WHERE id = ?';
    db.get(sql, [idUsuario], function(err, row) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        } else if (!row) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.json(row);
    });
});

// 3) Criar um novo usuário
router.post('/', function(req, res) {
    var nomeUsuario = req.body.name;
    var emailUsuario = req.body.email;
    if (!nomeUsuario || !emailUsuario) {
        return res.status(400).json({ erro: 'É preciso enviar name e email' });
    }
    var sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.run(sql, [nomeUsuario, emailUsuario], function(err) {
        if (err) {
            return res.status(400).json({ erro: err.message });
        }
        var novoUsuario = {
            id: this.lastID,
            name: nomeUsuario,
            email: emailUsuario
        };
        res.status(201).json(novoUsuario);
    });
});

// 4) Atualizar usuário existente
router.put('/:id', function(req, res) {
    var idUsuario = req.params.id;
    var novoNome = req.body.name;
    var novoEmail = req.body.email;
    if (!novoNome && !novoEmail) {
        return res.status(400).json({ erro: 'Envie name e/ou email para atualizar' });
    }
    var campos = [];
    var valores = [];
    if (novoNome) {
        campos.push('name = ?');
        valores.push(novoNome);
    }
    if (novoEmail) {
        campos.push('email = ?');
        valores.push(novoEmail);
    }
    valores.push(idUsuario);
    var sql = 'UPDATE users SET ' + campos.join(', ') + ' WHERE id = ?';
    db.run(sql, valores, function(err) {
        if (err) {
            return res.status(400).json({ erro: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.json({ atualizado: this.changes });
    });
});

// 5) Remover usuário
router.delete('/:id', function(req, res) {
    var idUsuario = req.params.id;
    var sql = 'DELETE FROM users WHERE id = ?';
    db.run(sql, [idUsuario], function(err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.status(204).send();
    });
});

module.exports = router;
