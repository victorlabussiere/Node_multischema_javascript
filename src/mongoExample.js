const Mongoose = require('mongoose');

Mongoose.connect('mongodb://admin:vasco@localhost:27017/')
    .catch(e => console.error('Erro na conexão', e))

const connection = Mongoose.connection
connection.once('open', () => console.log('Conexão estabelecida.'))

const schemaHero = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    }
})

const model = Mongoose.connection.useDb('heros').model('meus-herois', schemaHero,)

async function main() {
    const create = await model.create({
        nome: 'Victor',
        poder: 'Javascript'
    })
    console.log('CREATE', create)

    const read = await model.findOne({ nome: 'Victor' })
    console.log('READ', read)
    const hero = read

    const update = await model.updateOne({ nome: 'Victor' }, { poder: 'Mongoose' })
    console.log('UPDATED', await model.find(), update.acknowledged)

    const deleter = await model.deleteOne({ nome: 'Victor' })
    console.log('DELETE', await model.find({}), deleter)
}

main()