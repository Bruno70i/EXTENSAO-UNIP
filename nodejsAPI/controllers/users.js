import { openDb } from '../ConfigDB.js' 

// cria a tabela "Users" caso nao exista
export async function createTable(){
    openDb().then(db=> {
        db.exec('CREATE TABLE IF NOT EXISTS Users ( id INTEGER PRIMARY KEY, nome TEXT NOT NULL, email TEXT UNIQUE NOT NULL )')
    })
}

// SELECIONA usuario pelo ID
export async function SelectUser(req, res){
    let id = req.body.id;
     openDb().then(db => { db.get('SELECT * FROM Users WHERE id=?', [id])
       .then(user => res.json(user))
    })
}

// SELECIONA todos os usuarios
export async function SelectUsers(req, res){
    openDb().then(db => { db.all('SELECT * FROM Users')
       .then(user => res.json(user))
    })
}

// Inserir novo usuario
export async function insertUser(req, res){
    let user = req.body;
    openDb().then(db=> {db.run('INSERT INTO Users (nome , email) VALUES (?,?)', [user.nome, user.email])
    })
    res.json({
        "statusCode": 200
    })
}

// Atualiza o usuario pelo ID
export async function UpdateUser(req, res){
    let user = req.body;
    openDb().then(db => { db.run('UPDATE Users SET nome=?, email=? WHERE id=?', [user.nome, user.email, user.id]);
    });
    res.json({ statusCode: 200 });
}

// Deleta o usuario
export async function deleteUser(req, res){
    let id = req.body.id;
    openDb().then(db => { db.run('DELETE FROM Users WHERE id=?', [id]).then(() => {
              res.json({ statusCode: 200 });
          });
    });
}