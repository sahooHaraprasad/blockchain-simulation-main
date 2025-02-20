const { calculateHash } = require('../utils/hash');

class Block {
    constructor(index, timestamp, transactions, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateBlockHash();
        this.miningStats = {
            startTime: 0,
            endTime: 0,
            attempts: 0
        };
    }

    calculateBlockHash() {
        return calculateHash({
            index: this.index,
            timestamp: this.timestamp,
            transactions: this.transactions,
            previousHash: this.previousHash,
            nonce: this.nonce
        });
    }

    mineBlock(difficulty) {
        this.miningStats.startTime = Date.now();
        this.miningStats.attempts = 0;
        
        const target = Array(difficulty + 1).join('0');
        
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.miningStats.attempts++;
            this.hash = this.calculateBlockHash();
            
            if (this.miningStats.attempts % 100 === 0) {
                this.timestamp = Date.now();
            }
        }
        
        this.miningStats.endTime = Date.now();
        
        console.log(`Block mined: ${this.hash}`);
        console.log(`Mining stats:
            - Time taken: ${(this.miningStats.endTime - this.miningStats.startTime) / 1000} seconds
            - Attempts: ${this.miningStats.attempts}
            - Final nonce: ${this.nonce}
        `);
    }

    getMiningDifficulty() {
        return {
            attempts: this.miningStats.attempts,
            duration: this.miningStats.endTime - this.miningStats.startTime,
            hashRate: this.miningStats.attempts / ((this.miningStats.endTime - this.miningStats.startTime) / 1000)
        };
    }
}

module.exports = Block;
