const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.targetMiningTime = 3000; // Target: 3 seconds per block
        this.difficultyAdjustmentBlocks = 5; // Adjust difficulty every 5 blocks
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), ['Genesis Block'], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    adjustDifficulty() {
        if (this.chain.length % this.difficultyAdjustmentBlocks !== 0) {
            return this.difficulty;
        }

        const lastBlock = this.getLatestBlock();
        const miningStats = lastBlock.getMiningDifficulty();
        
        if (miningStats.duration > this.targetMiningTime * 1.5) {
            return Math.max(1, this.difficulty - 1);
        } else if (miningStats.duration < this.targetMiningTime * 0.5) {
            return this.difficulty + 1;
        }
        return this.difficulty;
    }

    addBlock(transactions) {
        const block = new Block(
            this.chain.length,
            Date.now(),
            transactions,
            this.getLatestBlock().hash
        );
        
        this.difficulty = this.adjustDifficulty();
        console.log(`Mining with difficulty: ${this.difficulty}`);
        
        block.mineBlock(this.difficulty);
        this.chain.push(block);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateBlockHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;
