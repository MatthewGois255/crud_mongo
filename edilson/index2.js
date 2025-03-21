const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const bcrypt = require("bcrypt")
const mysql = require("mysql2")

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("combined"))


const con = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "",
    database: "dbexpress"
})


app.get("/", (req, res) => {
    con.query("select * from clientes", (error, result) => {
        if (error) {
            return res.status(500).send({ msg: `Erro ao tentar peidar ${error}` })
        }
        res.status(200).send({ payload: result })
    })
})
app.post("/cadastrar", (req, res) => {
    bcrypt.hash(req.body.senha, 10, (error, novasenha) => {
        if (error) {
            return res.status(500).send({ msg: `Erro ao cadastrar. Tente novamente mais tarde` })
        } else {
            req.body.senha = novasenha
            console.log(req.body)
            con.query("insert into clientes set ?", req.body, (error, result) => {
                if (error) {
                    return res.status(400).send({ msg: `Erro ao tentar cadastrar ${error}` })
                }
                res.status(201).send({ msg: `Cliente cadastrado`, payload: result })
            })
        }
    })
})

app.put("/atualizar/:id", (req, res) => {
    if (req.params.id == null || req.params.id == 0) {
        return res.status(400).send({ msg: `Insira o id` })
    }
    con.query("update clientes set ? where id=?", [req.body, req.params.id], (error, result) => {
        if (error) {
            return res.status(500).send({ msg: `Erro ao tentar atualizar` })
        }
        res.status(200).send({ msg: `Cliente atualizado`, payload: result })
    })


})
app.delete("/delete/:id", (req, res) => {
    app.send("DELETE")
})

app.post("/login", (req, res) => {
    con.query("select * from clientes where usuario=?", req.body.usuario, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: `Erro ao tentar logar` })
        } else if (result[0] == null) {
            return res.status(400).send({ msg: `Usuário ou senha incorretos` })
        } else {
            bcrypt.compare(req.body.senha, result[0].senha)
                .then((igual) => {
                    if (!igual) {
                        return res.status(400).send({ msg: `Usuário ou senha incorretos` })
                    } else {
                        res.status(200).send({ msg: `Tudo limpo amigão, pode passar` })
                    }
                })
                .catch((error) =>
                    res.status(500).send({ msg: `Não foi possível logar, tente novamente mais tarde` })
                )
        }
    })
})

app.listen(8000, () => console.log("Rodando na porta 8000"))