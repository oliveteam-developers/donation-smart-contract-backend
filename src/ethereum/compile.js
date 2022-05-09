const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const contractPath = path.resolve(__dirname, 'contracts', 'Donation.sol');
const source = fs.readFileSync(contractPath, 'UTF-8');

const input = {
    language: 'Solidity',
    sources: {
        'Donation.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const buildPath = path.resolve(__dirname, 'build');
fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}
