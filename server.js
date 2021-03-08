const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

let contador = 2;

const app = express();
const porta = 3000;

app.set('port', porta);
app.use(bodyParser.json());

const clientes = [
    {
        id: 1,
        nome: 'João',
        email: 'joao@gmail.com'
    },
    {
        id: 2,
        nome: 'Vitor',
        email: 'vitor@gmail.com'
    }
];

app.get("/clientes", (req, res, next) => {
    res.json(clientes);
});

app.post("/clientes", (req, res, next) => {
    const cliente = req.body;
    clientes.push({
        id: contador += 1,
        nome: cliente.nome,
        email: cliente.email
    });
    res.status(201).json(clientes);
});

app.put("/clientes/:id", (req, res, next) => {
    clientes.forEach(cliente => {
        if (cliente.id === req.params.id) {
            cliente.nome = req.body.nome;
            cliente.email = req.body.email;
        }
    });
    res.status(204).json(clientes);
});

app.delete("/clientes/:id", (req, res, next) => {
    clientes.forEach(cliente => {
        if (cliente.id === req.params.id) {
            var index = clientes.indexOf(cliente.id);
            clientes.splice(index);
        }
    });
    res.status(200).json(clientes);
});

const server = http.createServer(app);

server.listen(porta);