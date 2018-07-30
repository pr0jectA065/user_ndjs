var dbConfig={
    development:{url:'mongodb://localhost:27017/pr0jectA'},
    getDbPath:function(env){
        switch(env){
            case 'development':
                return dbConfig.development.url;
        }
    }

};

module.exports=dbConfig;
//module.exports={
    //syntax:url:'mongodb://localhost:27017/mongo database'
//    url:'mongodb://localhost:27017/pr0jectA'
//};