docker run --name postgres \
-e POSTGRES_USER=victorlabu \
-e POSTGRES_PASSWORD=vasco \
-e POSTGRES_DB=heroes \
-p 5432:5432 \
-d \
postgres

docker run --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

## ---- MONGODB

docker run --name  mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=vasco \
    -d \
    mongo:4

docker run --name mongoclient \
    -p 3030:3030 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

npm install sequelize -> instalando o sequelize
npm install pg-hstore pg -> instalando os drivers do banco de dados.