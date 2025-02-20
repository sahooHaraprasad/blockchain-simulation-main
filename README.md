# Blockchain Simulation

A simple JavaScript implementation of a blockchain that demonstrates core blockchain concepts including mining, proof-of-work, and chain validation.

## Features

- ✨ Block creation and mining
- 🔗 Cryptographic linking of blocks
- ⛏️ Proof-of-Work implementation
- ✅ Chain validation
- 🔒 Tamper detection
- 📝 Transaction handling

## Project Structure

```
blockchain-simulation/
├── models/
│   ├── Block.js         # Block class implementation
│   └── Blockchain.js    # Blockchain management class
├── utils/
│   └── hash.js         # Hashing utility functions
└── index.js            # Main demonstration file
```

## Technical Details

- **Block Structure**
  - Index
  - Timestamp
  - Transactions
  - Previous Hash
  - Current Hash
  - Nonce (for mining)
  - Mining Statistics
    - Start Time
    - End Time
    - Number of Attempts
    - Hash Rate

- **Hash Algorithm**: SHA-256
- **Proof of Work**: Dynamic difficulty adjustment
- **Validation**: Full chain integrity checking

## Blockchain Chain Structure

```
Block 0 (Genesis Block)
├── Index: 0
├── Timestamp: [creation time]
├── Transactions: ["Genesis Block"]
├── PreviousHash: "0"
├── Hash: [calculated hash]
└── Nonce: [mining nonce]
    │
    ▼
Block 1
├── Index: 1
├── Timestamp: [creation time]
├── Transactions: ["Transaction 1", "Transaction 2"]
├── PreviousHash: [Block 0 hash]
├── Hash: [calculated hash]
└── Nonce: [mining nonce]
    │
    ▼
Block 2
├── Index: 2
├── Timestamp: [creation time]
├── Transactions: ["Transaction 3", "Transaction 4"]
├── PreviousHash: [Block 1 hash]
├── Hash: [calculated hash]
└── Nonce: [mining nonce]
```

## Proof-of-Work Implementation

Our blockchain implements a proof-of-work system similar to Bitcoin's concept:

```javascript
// Example of the mining process
while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
    block.nonce++;
    block.hash = block.calculateBlockHash();
}
```

### How Proof-of-Work Works

1. **Difficulty Target**: 
   - Set by `this.difficulty = 2` in Blockchain class
   - Requires block hash to start with '00'

2. **Mining Process**:
   - Incrementing nonce until hash matches difficulty
   - More difficulty = more leading zeros required
   - Current setting requires 2 leading zeros

3. **Computational Cost**:
   - Higher difficulty = more computation needed
   - Average attempts needed:
     - Difficulty 1 (0): 16 attempts
     - Difficulty 2 (00): 256 attempts
     - Difficulty 3 (000): 4,096 attempts

4. **Example Output**:
```
Mining block...
Block mined: 00a1b2c3... (hash with required leading zeros)
Nonce used: 123
```

## Mining Features

### Dynamic Difficulty Adjustment
- Target mining time: 3 seconds per block
- Automatic adjustment every 5 blocks
- Difficulty increases/decreases based on mining performance
- Minimum difficulty level: 1

### Mining Statistics
```json
{
  "miningStats": {
    "attempts": 1234,
    "duration": 2.5,        // seconds
    "hashRate": 493.6       // hashes per second
  }
}
```

### Proof-of-Work Algorithm
```javascript
while (hash.substring(0, difficulty) !== target) {
    nonce++;
    attempts++;
    hash = calculateBlockHash();
    
    // Additional complexity: Update timestamp every 100 attempts
    if (attempts % 100 === 0) {
        timestamp = Date.now();
    }
}
```

### Mining Output Example
```
Mining with difficulty: 2
Block mined: 00f3a2c7...
Mining stats:
    - Time taken: 2.5 seconds
    - Attempts: 1234
    - Final nonce: 1234
```

## Performance Metrics

| Difficulty | Avg. Mining Time | Avg. Attempts |
|------------|-----------------|---------------|
| 1 (0)      | ~0.1 seconds    | ~16          |
| 2 (00)     | ~3.0 seconds    | ~256         |
| 3 (000)    | ~12.0 seconds   | ~4,096       |
| 4 (0000)   | ~48.0 seconds   | ~65,536      |

## Getting Started

1. Run the simulation:
```bash
npm start
```

## Example Output

```json
{
  "status": true,
  "message": "Blockchain is valid and secure"
}
```

After tampering:
```json
{
  "status": false,
  "message": "Warning: Blockchain has been tampered with!"
}
```

## Core Components

### Block Class
Handles individual block creation, hashing, and mining operations.

### Blockchain Class
Manages the entire chain, including:
- Genesis block creation
- Adding new blocks
- Chain validation
- Tamper detection

### Hash Utility
Provides cryptographic functions using SHA-256 for secure block linking.

## Use Cases

- Educational purposes
- Understanding blockchain basics
- Demonstrating blockchain security
- Learning about proof-of-work

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License
