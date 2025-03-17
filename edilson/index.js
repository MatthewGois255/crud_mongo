const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("combined"))

const urldb = "mongodb+srv://senac:123senac@cluster0.fodp1.mongodb.net/banco?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(urldb, { useNewUrlParser: true, useUnifiedTopology: true })

const tabela = new mongoose.Schema({
    nomecliente: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    telefone: {
        type: String
    },
    idade: {
        type: Number,
        min: 16,
        max: 120
    },
    usuario: {
        type: String,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    datacadastro: {
        type: Date,
        default: Date.now
    }
})

const Cliente = mongoose.model("tbclientes", tabela)

app.get("/", (req, res) => {
    Cliente.find()
        .then((result) => {
            res.status(200).send({ output: "ok", payload: result })
        })
        .catch((error) =>
            res.status(500).send({ output: `Erro ao processar dados -> ${error}` })
        )
})

app.post("/cadastro", (req, res) => {
    const dados = new Cliente(req.body)
    dados
        .save()
        .then((result) => {
            res.status(201).send({ output: "Cadastro realizado", payload: result })
        })
        .catch((err) =>
            res.status(500).send({ output: `Erro ao cadastrar -> ${err}` })
        )
})

app.put("/update/:id", (req, res) => {
    Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            if (!result) {
                return res.status(400).send({ output: `Não foi possível atualizar` })
            }
            res.status(202).send({ output: `Atualizado`, payload: result })
        })
        .catch((erro) => {
            res.status(500).send({ output: `Erro ao processar a solicitação -> ${erro}` })
        })
})

app.delete("/delete/:id", (req, res) => {
    Cliente.findByIdAndDelete(req.params.id)
        .then((result) =>
            res.status(204).send({ payload: result })
        )
        .catch((erro) =>
            console.log(`Erro ao tentar apagar -> ${erro}`)
        )
})

app.listen("5000", () =>
    console.log("rodando na porta 5000"))