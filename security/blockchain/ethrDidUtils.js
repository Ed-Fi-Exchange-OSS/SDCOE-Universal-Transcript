const Eth = require('ethjs');
const { startGanacheServer, deployEthrDidRegistry } = require('@rsksmart/ethr-did-utils');

const startGanache = async (port) => {
  const serverInfo = await startGanacheServer(port);
  const { server, blockchain, eth, rpcUrl } = serverInfo;

  console.log(`Ganache started on port ${port} - rpcUrl: ${rpcUrl}`);
  console.log(`mnemonic: ${blockchain.mnemonic}`);
};

const deploySmartContract = async (port) => {
  const rpcUrl = `http://localhost:${port}`;
  const eth = new Eth(new Eth.HttpProvider(rpcUrl));
  const smartContract = await deployEthrDidRegistry(eth);
  const { registryAddress, registry } = smartContract;

  return {
    registryAddress: registryAddress,
    rpcUrl: rpcUrl
  }
};

module.exports = {
  startGanache,
  deploySmartContract,
};
