const ICrud = require('./interfaces/InterfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
        this.connect()
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'victorlabu',
            'vasco',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false
            }
        )
        await this.defineModel()
    }

    async defineModel() {
        this._herois = await this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        })
        this._herois.sync()
    }

    async isConnected() {
        return await this._driver.authenticate()
            .then(response => response = true)
            .catch(error => console.error('Connection error', error))
    }
    //
    async create(item) {
        let count = 0
        await this._herois.findAll()
            .then(res => res.map(hero => hero.dataValues))
            .then(dat => dat.map(inst =>
                inst.poder === item.poder && inst.nome === item.nome || inst.id === item.id
                    ? count++
                    : count
            ))
            .catch(errCreate => console.error('HERÓI NÃO CADASTRADO:', errCreate.message))

        return count === 0
            ? await this._herois.create(item).then(res => res.dataValues)
            : "Herói já cadastrado! Tente outro."
    }

    async read(params = {}) {
        const query = params
            ? { where: params, raw: true }
            : { raw: true }
        return await this._herois.findAll(query)
    }

    async update(id, item) {
        const response = await this._herois.update(item, { where: { id: id } })
            .catch(err => console.error('UPDATE Error', err))
        return response
    }

    async delete(id) {
        const query = id
            ? { id }
            : {}

        return await this._herois.destroy({ where: query })
    }
}
module.exports = Postgres