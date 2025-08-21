import { createTable, insertUser, UpdateUser, SelectUser, SelectUsers, deleteUser } from './controllers/users.js';
import { Router } from 'express';


const router = Router();

router.get('/', (req, res) =>
res.json({ statusCode: 200, msg: 'API rodando' })
);


// Listar todas as pessoas
router.get('/users', SelectUsers);

// Listar uma pessoa específica (por exemplo, por ID via query ou body)
router.get('/users/:id', SelectUser);

// Inserir pessoa
router.post('/users', insertUser);

// Atualizar pessoa
router.put('/users/:id', UpdateUser);

// Deletar pessoa
router.delete('/users/:id', deleteUser);


export default router;