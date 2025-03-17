const { conectar, desconectar } = require('./database.js')
const clienteModel = require('./src/models/Clientes.js')

const salvarCliente = async (nomeCli, foneCli, cpfCli) => {
    try {
        const novoCliente = new clienteModel({
            nomeCliente: nomeCli,
            foneCliente: foneCli,
            cpf: cpfCli
        })
        await novoCliente.save()
        console.log("Cliente adicionado")
    } catch (error) {
        console.log(error)
    }
}

let dados = [
    {
        nome: "Regina",
        fone: "192834646",
        cpf: "123434561"
    },
    {
        nome: "Rute",
        fone: "192834646",
        cpf: "123434562"
    },
    {
        nome: "Carolina",
        fone: "192834646",
        cpf: "123434563"
    },
    {
        nome: "Bete",
        fone: "192834646",
        cpf: "123434564"
    },
    {
        nome: "Josefina",
        fone: "192834646",
        cpf: "123434565"
    },
]
const iniciarSistema = async () => {
    await conectar()
    for(let i = 0; i < 5; i++) {
        await salvarCliente(dados[i].nome, dados[i].fone, dados[i].cpf)
    }
    await desconectar()
}

iniciarSistema()