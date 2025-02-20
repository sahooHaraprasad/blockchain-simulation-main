const Blockchain = require('./models/Blockchain');

const getValidationMessage = (isValid) => ({
    status: isValid,
    message: isValid ? 
        "Blockchain is valid and secure" : 
        "Warning: Blockchain has been tampered with!"
});

// init blockchain
const myBlockchain = new Blockchain();

console.log('Mining block 1...');
myBlockchain.addBlock(['Transaction 1', 'Transaction 2']);

console.log('Mining block 2...');
myBlockchain.addBlock(['Transaction 3', 'Transaction 4']);

console.log('Blockchain:', JSON.stringify(myBlockchain, null, 2));

// Validatate
const initialValidation = getValidationMessage(myBlockchain.isChainValid());
console.log('\nValidation Result:', initialValidation);

// with tamper
console.log('\nTampering with the blockchain...');
myBlockchain.chain[1].transactions = ['Tampered Transaction'];

// Check validation after tampering
const afterTamperValidation = getValidationMessage(myBlockchain.isChainValid());
console.log('Validation Result:', afterTamperValidation);
