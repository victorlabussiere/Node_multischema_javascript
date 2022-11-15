const ICrud = require('../interfaces/InterfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }

    static async connect() {
        const connection = new Sequelize(
            'heroes',
            'victorlabu',
            'vasco',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false,
                logging: false
            }
        )
        return connection
    }

    async isConnected() {
        return await this._connection.authenticate()
            .then(res => res = true)
            .catch(error => console.error('Connection error', error))
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync()
        return model
    }

    async create(item) {
        let count = 0
        await this._schema.findAll()
            .then(res => res.map(hero => hero.dataValues))
            .then(dat => dat.map(inst =>
                inst.poder === item.poder && inst.nome === item.nome || inst.id === item.id
                    ? count++
                    : count
            ))
            .catch(errCreate => console.error('HERÓI NÃO CADASTRADO:', errCreate.message))

        return count === 0
            ? await this._schema.create(item).then(res => res.dataValues)
            : "Herói já cadastrado! Tente outro."
    }

    async read(params = {}) {
        const query = params
            ? { where: params, raw: true }
            : { raw: true }
        return await this._schema.findAll(query)
    }

    async update(id, item) {
        const response = await this._schema.update(item, { where: { id: id } })
            .catch(err => console.error('UPDATE Error', err))
        return response
    }

    async delete(id) {
        const query = id
            ? { id }
            : {}

        return await this._schema.destroy({ where: query })
    }
}
module.exports = Postgres