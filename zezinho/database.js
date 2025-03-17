// môdulo de conexão com o banco de dados
const mongoose = require('mongoose')

const url = 'mongodb+srv://senac:123senac@cluster0.fodp1.mongodb.net/dbclientes'

let conectado = false

const conectar = async () => {
    if (!conectado) {
        try {
            await mongoose.connect(url)
            conectado = true
            console.log("Conectado")
        } catch (error) {
            if(error.code = 8000){
                console.log("Erro de autenticação")
            } else {
                console.log(error)
            }
        }
    }
}

const desconectar = async () => {
    if (conectado) {
        try {
            await mongoose.disconnect(url)
            conectado = false
            console.log("Desconectado")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = { conectar, desconectar }