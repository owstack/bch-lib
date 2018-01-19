var bchLib = require('@owstack/satoshi-common-lib');

// module information
bchLib.version = 'v' + require('../package.json').version;

bchLib.crypto.Signature.SIGHASH_FORKID = 0x40;

var Constants = require('./common/constants');
bchLib.Constants = Constants;

bchLib.Networks.remove(bchLib.Networks.livenet);
bchLib.Networks.remove(bchLib.Networks.testnet);

bchLib.Networks.add({
  chainName: Constants.CHAIN_NAME,
  chainSymbol: Constants.CHAIN_SYMBOL,
  name: Constants.LIVENET,
  alias: Constants.LIVENET_ALIAS,
  pubkeyhash: 0x00,
  privatekey: 0x80,
  scripthash: 0x05,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xe3e1f3e8,
  port: 8333,
  dnsSeeds: [
    'seed.bitcoinabc.org',
    'seed-abc.bitcoinforks.org',
    'btccash-seeder.bitcoinunlimited.info',
    'seed.bitprim.org ',
    'seed.deadalnix.me'
  ]
});

function addTestnet() {
    bchLib.Networks.add({
      chainName: Constants.CHAIN_NAME,
      chainSymbol: Constants.CHAIN_SYMBOL,
      name: Constants.TESTNET,
      alias: Constants.TESTNET_ALIAS,
      pubkeyhash: 0x6f,
      privatekey: 0xef,
      scripthash: 0xc4,
      xpubkey: 0x043587cf,
      xprivkey: 0x04358394,
      networkMagic: 0xf4e5f3f4,
      port: 18333,
      dnsSeeds: [
        'testnet-seed.bitcoinabc.org',
        'testnet-seed-abc.bitcoinforks.org',
        'testnet-seed.bitcoinunlimited.info',
        'testnet-seed.bitprim.org',
        'testnet-seed.deadalnix.me'
      ]
    });
}

function addRegtest() {
    bchLib.Networks.add({
      chainName: Constants.CHAIN_NAME,
      chainSymbol: Constants.CHAIN_SYMBOL,
      name: Constants.TESTNET,
      alias: Constants.TESTNET_ALIAS,
      pubkeyhash: 0x6f,
      privatekey: 0xef,
      scripthash: 0xc4,
      xpubkey: 0x043587cf,
      xprivkey: 0x04358394,
      networkMagic: 0xdab5bffa,
      port: 18444,
      dnsSeeds: []
    });
}

bchLib.Networks.enableRegtest = function enableRegtest() {
  bchLib.Networks.remove(bchLib.Networks.testnet);
  addRegtest();
  bchLib.Networks.testnet = bchLib.Networks.get(Constants.TESTNET);
  bchLib.Networks.testnet.regtestEnabled = true;
}

bchLib.Networks.disableRegtest = function disableRegtest() {
  bchLib.Networks.remove(bchLib.Networks.testnet);
  addTestnet();
  bchLib.Networks.testnet = bchLib.Networks.get(Constants.TESTNET);
  bchLib.Networks.testnet.regtestEnabled = false;
}

addTestnet();

bchLib.Networks.defaultNetwork = bchLib.Networks.get(Constants.LIVENET);
bchLib.Networks.livenet = bchLib.Networks.get(Constants.LIVENET);
bchLib.Networks.mainnet = bchLib.Networks.get(Constants.LIVENET);
bchLib.Networks.testnet = bchLib.Networks.get(Constants.TESTNET);

module.exports = bchLib;
