const express = require('express');
const server = express();
const clientes = require('./src/data/clientes.json');

server.use(express.json());

//listar todos os clientes (GET)
server.get('/clientes', (req, rest) => {
    return rest.json(clientes)
})

//listar cliente especifico (GET)
server.get('/clientes/:id', (req, rest) => {
    const idCliente = req.params.id;

    if (clientes[idCliente]) {
        return rest.json({ cliente: clientes[idCliente] });
    } else {
        return rest.status(404).json({ error: 'Cliente não encontrado' });
    }
});

//Criar novo cliente (POST)
server.post('/clientes', (req, res) => {
    const novoCliente = req.body;

    clientes.push(novoCliente);

    return res.json(clientes);
});

//Alterar cliente (PUT)
server.put('/clientes/:indice', (req, res) => {
    const indice = req.params.indice;
    const novoCliente = req.body;

    clientes[indice] = novoCliente;

    return res.json(clientes);
});

//Deletar cliente (DELETE)
server.delete('/clientes/:indice', (req, res) =>{
    const indice = req.params;

    clientes.splice(indice,1);

    return res.json(clientes);
})

server.listen(3000)
    console.log('Funcionando');
