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
        if (error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado`)
        } else {
            console.log(error)
        }
    }
}

const listarClientes = async () => {
    try {
        const clientes = await clienteModel.find().sort({
            nomeCliente: 1
        })
        console.log(clientes)
    } catch (error) {
        console.log(error)
    }
}

const buscarClienteNome = async (nome) => {
    try {
        const clienteNome = await clienteModel.find({
            nomeCliente: new RegExp(nome, 'i')
        })
        console.log(clienteNome)
    } catch (error) {
        console.log(error)
    }
}

const buscarClienteCpf = async (cpf) => {
    try {
        const clienteCpf = await clienteModel.find({
            cpf: new RegExp(cpf)
        })
        console.log(clienteCpf)
    } catch (error) {
        console.log(error)
    }
}

const atualizarCliente = async (id, nome, fone, cpf) => {
    try {
        const clienteEditado = await clienteModel.findByIdAndUpdate(id,
            {
                nomeCliente: nome,
                foneCliente: fone,
                cpf: cpf
            },
            {
                new: true, runValidators: true
            }
        )
        console.log("Dados Cadastrados com sucesso")
    } catch (error) {
        if (error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado`)
        } else {
            console.log(error)
        }
    }
}

const deletarCliente = async (id) => {
    try {
        const clienteDeletado = await clienteModel.findByIdAndDelete(id)
        console.log("Cliente excluído com sucesso")
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
    // for(let i = 0; i < 5; i++) {
    //     await salvarCliente(dados[i].nome, dados[i].fone, dados[i].cpf)
    // }
    // await listarClientes()
    // await buscarClienteNome("Marília")
    // await buscarClienteCpf("123434562")
    // await atualizarCliente("67d88247af796dd4c05838e5", "Júlia")
    
    await deletarCliente("67d88247af796dd4c05838e5")
    await buscarClienteNome("Júlia")
    await desconectar()
}

iniciarSistema()