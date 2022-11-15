const Mongoose = require('mongoose')

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
this._schema = Mongoose.connection.useDb('hero')
module.exports = this._schema.model('hero-collection', heroisSchema)