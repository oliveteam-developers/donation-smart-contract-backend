require('dotenv').config({ path: '../../.env' });

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/Factory.json');
const abi = compiledFactory.abi;
const bytecode = compiledFactory.evm.bytecode.object;

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: process.env.ETHEREUM_MNEMONIC
    },
    providerOrUrl: process.env.ETHEREUM_URL
});
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(abi).deploy({ data: bytecode }).send({ gas: '3000000', from: accounts[0] });
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();