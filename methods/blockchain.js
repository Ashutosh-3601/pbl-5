const Block = require('./block');

class BlockChain {
    constructor(database) {
        this.db = database.db.collection('blockchain');
        this.lastBlock = this.getLastBlock();
    }

    async init() {
        if(await this.lastBlock) return true;
        const genesisBlock = new Block(0, { data: "Genesis Block"});
        await this.insertSafeBlock(genesisBlock);
        console.log("Added Genesis Block!")
        return false;
    }

    async generateAndAddBlock(data) {
        const difficulty = Math.floor(Math.random() * 3) + 1;
        const { index, hash } = await this.lastBlock;
        const block = new Block(index + 1, data, hash, difficulty)
        await this.insertSafeBlock(block);
        return block;
    }

    async insertSafeBlock(block) {
        try {
            await this.db.insertOne(block);
            this.lastBlock = block;
        } catch(e) {
            console.error(e);
            process.exit(-1);
        }
    }

    async retreiveBlock(id) {
        try {
            const block = await this.db.findOne({ "data.identifier": id });
            if(!block) false;
            else return block;
        } catch (e) {
            console.error(e);
            process.exit(-1);
        }
    }

    async getLastBlock() {
        const block = await this.db.findOne({},{ sort: { _id: -1 } });
        if(!block) return null;
        return block;
    }
}

module.exports = BlockChain;