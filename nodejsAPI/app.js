// app.js (ES Modules)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createTable } from './controllers/users.js'; // importa a funcao sql que cria a tabela
import router from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// subi um nível para chegar em D:\github\EXTENSAO-UNIP
const projectRoot = path.resolve(__dirname, '..');

const app = express();
app.use(express.json());

// Serve qualquer arquivo estático dentro de D:\github\EXTENSAO-UNIP\public
app.use(express.static(path.join(projectRoot, 'public')));

// Forçar GET / a retornar o index que está em public/pages/index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(projectRoot, 'public', 'pages', 'index.html'));
});

// rotas da API
app.use(router);

createTable(); // executa funcao sql que cria a tabela

app.listen(3000, function() {
    console.log('Servidor rodando em http://localhost:3000');
});
    
