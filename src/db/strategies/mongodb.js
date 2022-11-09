const ICrud = require('./interfaces/InterfaceCrud')

class MongoDb extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log("O item foi salvo em MongoDB.")
    }
}

module.exports = MongoDb