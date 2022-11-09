const assert = require('assert');
const Context = require('../db/strategies/base/contextStrategy')
const Mongo = require('../db/strategies/mongodb');

const Mongoose = require('mongoose')
const connection = Mongoose.connect('mongodb://localhost:27017/heros')



const context = new Context(new Mongo())

describe('MongoDB strategy', () => {

    it('test mongoField', async () => {
        console.log(await connection)
    })

})