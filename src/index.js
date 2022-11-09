const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoDb = require("./db/strategies/mongodb");
const Postgress = require("./db/strategies/postgres");

const contextMongo = new ContextStrategy (new MongoDb())
contextMongo.create()

const contextPostgre = new ContextStrategy(new Postgress())
contextPostgre.create()