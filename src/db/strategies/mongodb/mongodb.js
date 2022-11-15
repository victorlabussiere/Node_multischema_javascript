const ICrud = require('../interfaces/InterfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectado'
}

class MongooseStrategy extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._database = null
        this._herois = null
    }

    async connect() {
        await Mongoose.connect('mongodb://admin:vasco@localhost:27017')
            .catch(eConnect => console.error('ERRO DE CONEXÃO ===>', eConnect.message))
        const connection = Mongoose.connection
        connection.once('open', () => console.log('CONEXÃO ESTABELECIDA'))
        this._driver = connection

        return this.defineModel() // SEMPRE QUE UM BANCO DE DADOS CONECTAR, DEVE-SE INFORMAR O MODELO DE TABELA QUE ESSA CONEXÃO TEM.
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        state === 'Conectado'
            ? state
            : await new Promise(res => setTimeout(res, 500))
        return STATUS[this._driver.readyState]
    }

    async defineModel() {
        // A ETAPA DE DEFINIR MODELO SERVE PARA AUXILIAR DURANTE A CONEXÃO CRIANDO A TABELA E A COLEÇÃO.
        const heroisSchema = new Mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            }
        })
        this._database = this._driver.useDb('heros')
        this._herois = this._database.model('hero-collection', heroisSchema)
    }

    async create(item) {
        let count = 0
        await this._herois.find()
            .then(res => res.map(hero => hero.poder === item.poder && hero.nome === item.nome ? count++ : count))
            .catch(eValidation => console.error('Erro de VALIDAÇÃO', eValidation))
        return count === 0
            ? await this._herois.create(item)
            : false
    }

    async read(query, skip = 0, limit = 10) {
        query
            ? query = { query }
            : query = {}
        return await this._herois.find(query).skip(skip).limit(limit).catch(err => console.error('ERRO', err.message))
    }

    async update(query, item) {
        return await this._herois.updateOne(query, { $set: item })
    }

    async delete(query) {
        query
            ? { query }
            : {}
        return await this._herois.findOneAndDelete(query)
            .then(res => res = true)
            .catch(err => console.error(err.message))
    }
}
module.exports = MongooseStrategy