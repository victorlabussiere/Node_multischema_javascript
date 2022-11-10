const assert = require('assert');
const Context = require('../db/strategies/base/contextStrategy')
const Mongo = require('../db/strategies/mongodb');

const Mongoose = require('mongoose')
Mongoose.connect('mongodb://localhost:27017/heros')
const context = new Context(new Mongo())

describe('MongoDB strategy', () => {

    it('Deve testar a conexão com o Banco de Dados.', async () => {
        result = await context.isConnected()
        console.log('isConnected TEST RESULT ===>', result)
        return assert.ok(result === 'Conectado');
    })

})