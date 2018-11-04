let client  = require('mongodb').MongoClient;

module.exports = class UserDAO {
    static find() {
        return client.connect('mongodb://localhost:27017/test',
            {useNewUrlParser: true}).then((client) => {
                let db = client.db('test');
                return db.collection('users').find().sort({nome: 1}).toArray();
            }).catch((err) => {throw err; });
    }

    static insert(login, senha, email) {
        return client.connect('mongodb://localhost:27017/test',
            {useNewUrlParser: true}).then((client) => {
                let db = client.db('test');
                db.collection('users').insertOne({'login':login, 'senha':senha, 'email':email });
            }).catch((err) => {throw err; });
    }

    static findByLogin(login){
        return client.connect('mongodb://localhost:27017/test',
            {useNewUrlParser: true}).then((client) => {
                let db = client.db('test');
                return db.collection('users').find({'login':login}).toArray();
            }).catch((err) => {throw err; });
    }

    static findByEmail(email){
        return client.connect('mongodb://localhost:27017/test',
            {useNewUrlParser: true}).then((client) => {
                let db = client.db('test');
                return db.collection('users').find({'email':email}).toArray();
            }).catch((err) => {throw err; });
    }
};