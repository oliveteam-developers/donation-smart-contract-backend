const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
if (buildPath) {
    fs.removeSync(buildPath);
}

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

fs.ensureDirSync(buildPath);

for (let contractName in output.contracts['Donation.sol']) {
    fs.outputJsonSync(
        path.resolve(buildPath, `${contractName}.json`),
        output.contracts['Donation.sol'][contractName]
    );
}