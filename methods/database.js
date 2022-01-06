const { MongoClient } = require('mongodb');

class Mongo {
  constructor(){
    this.db = null;
  }
    async init() {
        const connection = {
            url: process.env.MONGO_URL,
            db: process.env.DB
        }

        if (!connection.url) throw Error('URL missing!')

        this.mongo = await MongoClient.connect(connection.url, { useUnifiedTopology: true })
            .then(mongo => {
                console.log('Connected to MongoDB');
                return mongo;
            }).catch(error => {
                console.error(`Connection failed due to ${error}`);
                process.exit(-1);
            });

        this.db = this.mongo.db(connection.db);
    }
}

const mongo = new Mongo()

module.exports = mongo;