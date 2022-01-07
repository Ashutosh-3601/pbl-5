const SHA256 = require('crypto-js/sha256');
const { uid } = require('./util.js');

class Block {
   constructor(index, data, prevHash = '0', difficulty = 2, nonce = 0) {
       this.index = index;
       this.timestamp = Math.floor(Date.now() / 1000);
       this.data = { ...data, identifier: uid() };
       this.prevHash = prevHash;
       this.nonce = nonce
       this.hash = this.getHash(difficulty);
   }

    getHash(difficulty) {
        let hash = '';
        while(!this.validHash(hash, difficulty)) {
            hash = this.calculateHash()
            ++this.nonce
        }
        return hash;
    }

    validHash(hash, difficulty) {
        return hash.substr(0, difficulty) === difficulty.toString().repeat(difficulty)
    }

   calculateHash() {
       return SHA256(JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp + this.nonce).toString();
   }
}

module.exports = Block;