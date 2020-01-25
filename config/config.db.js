var dbConfig = {
    development: {
        hostname: process.env.IP,
        port: '27017',
        database: 'pr0jectA',
        username: '',
        password: ''

    },
    production: {
        hostname: process.env.IP,
        port: '27017',
        database: 'pr0jectA',
        username: '',
        password: ''

    },
    getDbPath: function (env) {
        switch (env) {
            case 'development':
                return 'mongodb://' + dbConfig.development.hostname + ":" + dbConfig.development.port + "/" + dbConfig.development.database;
            case 'dev':
                return 'mongodb://' + dbConfig.development.username + ":" + dbConfig.development.password + "@" + dbConfig.development.hostname + ":" + dbConfig.development.port + "/" + dbConfig.development.database;
            case 'production':
                return 'mongodb://' + dbConfig.production.hostname + ":" + dbConfig.production.port + "/" + dbConfig.production.database;
        }
    }

};

module.exports = dbConfig;
//module.exports={
//syntax:url:'mongodb://localhost:27017/mongo database'
//    url:'mongodb://localhost:27017/pr0jectA'
//};