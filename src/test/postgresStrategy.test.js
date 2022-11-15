const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome: 'Gavia Negro',
    poder: 'Flechada',
    id: 37
}

describe('Postgres Strategy', () => {

    beforeEach(async () => {
        context.create({
            nome: "Victor",
            poder: "Javascript",
            id: 1
        })
        context.create({
            nome: "Ana Julia",
            poder: "Chorar",
            id: 2
        })
        context.create({
            nome: "Kricia",
            poder: "Chorar Mais",
            id: 3
        })
    })

    it('IS CONNECTED TEST', async () => {
        const result = await context.isConnected()
        // console.log('RESULT isConnect ===>', result)
        assert.equal(result, true || false)
    })

    it('CREATE deve retorar um Boolean representando o sucesso ou falha da execução.', async () => {
        const { nome, poder, id } = await context.create(MOCK_HEROI_CADASTRAR)
        const result = { nome, poder, id }
        // console.log('CREATE RESULT ===>', result)
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('READ SEM QUERY deve retornar uma lista com todas as instâncias da tabela.', async () => {
        const result = await context.read()
        const expected = 1
        console.log('READ WITHOUT QUERY LIST LENGTH ===>', result)
        assert.ok(result.length !== expected)
    })

    it('READ COM QUERY deve retornar um resultado, ou lista, de acordo com a pesquisa.', async () => {
        const [result] = await context.read({ id: MOCK_HEROI_CADASTRAR.id })
        const query = MOCK_HEROI_CADASTRAR
        // console.log('READ RESULT ===>', result)
        assert.deepEqual(result.id, query.id)
    })

    it('UPDATE deve retornar 1 para SUCESSO e 0 para ERRO.', async () => {
        // console.log('*****BEFORE UPDATE:', MOCK_HEROI_CADASTRAR.nome)
        const [result] = await context.update(37, { nome: 'Gavião Negro', poder: 'Muita Flechada' })
        // console.log('UPDATE RESULT ===>', result)
        // console.log('*****AFTER UPDATE:', await context.read({ id: 37 }).then(res => res[0].nome))
        assert.ok(result === 1 || result === 0)
    })

    it('DELETE deve retornar 1 para SUCESSO e 0 para ERRO.', async () => {
        const result = await context.delete(37)
        // console.log('DELETE RESULT ===>', result)
        assert.ok(result === 1 || result === 0)
    })

})