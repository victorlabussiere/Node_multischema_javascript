const ICrud = require('./interfaces/InterfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectado'
}

class MongoDb extends ICrud {
    constructor() {
        super()
        this._driver = null;
        this._database = null;
        this._hero = null
    }

    async connect() {
        await Mongoose.connect('mongodb://admin:vasco@localhost:27017/')
            .catch(eConnect => console.error('ERRO DE CONEXÃO ===>', eConnect.message))
        const connection = Mongoose.connection
        return connection.once('open', () => console.log('Conexão estabelecida'))
    }

    async isConnected() {
        const state = STATUS[await Mongoose.connection.readyState]
        state === 'Conectado'
            ? state
            : await new Promise(res => setTimeout(res, 1000))
        return STATUS[await Mongoose.connection.readyState]
    }

    async defineModel() {
        const collectionSchema = new Mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            }
        })
        this._database = await Mongoose.connection.useDb('hero')
        this._hero = await this._database.model('hero-collection', collectionSchema)
    }
}

module.exports = MongoDb