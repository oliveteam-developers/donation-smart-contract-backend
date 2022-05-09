require('dotenv').config({ path: '../../.env' });

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const deployAddressModel = require('../models/deployedAddress');
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
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await new web3.eth.Contract(abi).deploy({ data: bytecode }).send({ gas: '3000000', from: accounts[0] });

        await deployAddressModel.create({
            account: accounts[0],
            address: result.options.address,
            created_at: new Date(),
            updated_at: new Date(),
        });

        console.log('Deploy successfully');
        provider.engine.stop();
    } catch (e) {
        console.log(e);
    }
};
deploy();