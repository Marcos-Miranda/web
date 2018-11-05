let client  = require('mongodb').MongoClient;

module.exports = class publiDAO {
    static find() {
        return client.connect('mongodb://localhost:27017/test',
            {useNewUrlParser: true}).then((client) => {
                let db = client.db('test');
                return db.collection('publications').find().toArray();
            }).catch((err) => {throw err; });
    }

    static insert(login, titulo, descricao) {
        return client.connect('mongodb://localhost:27017/test',
            {useNewUrlParser: true}).then((client) => {
                let db = client.db('test');
                db.collection('publications').insertOne({'login':login, 'titulo':titulo, 'descricao':descricao});
            }).catch((err) => {throw err; });
    }

    static findByLogin(login){
        return client.connect('mongodb://localhost:27017/test',
            {useNewUrlParser: true}).then((client) => {
                let db = client.db('test');
                return db.collection('publications').find({'login':login}).toArray();
            }).catch((err) => {throw err; });
    }

 
};