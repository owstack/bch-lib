'use strict';

var Networks = require('@owstack/network-lib');
var Bip44 = Networks.Bip44;

var currency = 'BCH';
var regtestEnabled = false;

/**
 * For object definition see https://github.com/owstack/key-lib/blob/master/lib/networks.js
 */
 
var networks = [{
  currency: currency,
	description: 'Bitcoin Cash',
	name: 'bch',
  alias: 'livenet',
	coinIndex: Bip44['BCH'] ^ 0x80000000,
	protocol: 'bitcoincash',
	prefix: {
	  pubkeyhash: 0x00,
	  privatekey: 0x80,
	  scripthash: 0x05,
	},
  version: { // see SLIP132 (no BCH version strings registered)
    xpubkey: {
      bytes: 0x03f72812,
      text: 'qpub'
    },
    xprivkey: {
      bytes: 0x03f723d8,
      text: 'qprv'
    }
  },
  networkMagic: 0xe3e1f3e8,
	port: 8333,
	dnsSeeds: [
    'seed.bitcoinabc.org',
    'seed-abc.bitcoinforks.org',
    'btccash-seeder.bitcoinunlimited.info',
    'seed.bitprim.org ',
    'seed.deadalnix.me'
	]
}, {
  currency: currency,
	description: 'BCH Testnet',
	name: 'bchtest',
  alias: 'testnet',
	coinIndex: Bip44['TESTNET'] ^ 0x80000000,
	protocol: 'bchtest',
	prefix: {
		pubkeyhash: 0x6f,
	  privatekey: 0xef,
	  scripthash: 0xc4
	},
  version: { // see SLIP132 (no BCH version strings registered)
    xpubkey: {
      bytes: 0x0435dbaa,
      text: 'tqpb'
    },
    xprivkey: {
      bytes: 0x0435dc2e,
      text: 'tqpv'
    }
  },
	networkMagic: 0x0b110907,
	port: 18333,
	dnsSeeds: [
		'testnet-seed.bitcoin.petertodd.org',
    'testnet-seed.bluematt.me',
    'testnet-seed.alexykot.me',
    'testnet-seed.bitcoin.schildbach.de'
	]
}, {
  currency: currency,
	description: 'BCH Regtest',
	name: 'bchreg',
  alias: 'testnet',
	coinIndex: Bip44['TESTNET'] ^ 0x80000000,
	protocol: 'bchreg',
	prefix: {
		pubkeyhash: 0x6f,
	  privatekey: 0xef,
	  scripthash: 0xc4
	},
  version: { // see SLIP132 (no BCH version strings registered)
    xpubkey: {
      bytes: 0x0435dbaa,
      text: 'tqpb'
    },
    xprivkey: {
      bytes: 0x0435dc2e,
      text: 'tqpv'
    }
  },
  networkMagic: 0xdab5bffa,
	port: 18444,
	dnsSeeds: [],
	indexBy: Networks.indexMinimal
}];

Networks.add(networks);

/**
 * @constructor
 */
function BchNetworks() {}

/**
 * @function
 * @member BchNetworks#get
 * Retrieves the network associated.
 * @param {string|number|Network} arg
 * @param {string|Array} keys - if set, only check if the keys associated with this name match
 * @return Network
 */
BchNetworks.get = function(arg, keys) {
  var network;

  if (typeof(arg) === 'string') {
	  arg = arg.trim();

	  switch (arg) {
	  	case 'livenet':
	  	case 'mainnet':
	  		network = Networks.get('bch', keys, currency);
	  		break;

	  	case 'testnet':
	  		if (regtestEnabled) {
		  		network = Networks.get('bchreg', keys, currency);
		  	} else {
		  		network = Networks.get('bchtest', keys, currency);
		  	}
	  		break;

	  	case 'regtest':
	  		network = Networks.get('bchreg', keys, currency);
	  		break;
	  }
  }

  if (!network) {
		network = Networks.get(arg, keys, currency);
  }

	return network;
};

/**
 * @function
 * @member Networks#getProtcols
 * Returns an array of protocols names
 */
BchNetworks.getProtocols = function() {
	var protocols = [];
  for (var i = 0; i < networks.length; i++) {
    if (networks[i].protocol) {
      protocols.push(networks[i].protocol);
    }
  }
  return protocols;
};

/**
 * @function
 * @member Networks#getLivenetProtcol
 * Returns the livenet protocol
 */
BchNetworks.getLivenetProtocol = function() {
  for (var i = 0; i < networks.length; i++) {
    if (networks[i].alias == 'livenet') {
      return networks[i].protocol;
    }
  }
  throw new Error('No livenet protocol found');
};

/**
 * @function
 * @member Networks#enableRegtest
 * Will enable regtest features for testnet
 */
BchNetworks.enableRegtest = function() {
  regtestEnabled = true;
};

/**
 * @function
 * @member Networks#disableRegtest
 * Will disable regtest features for testnet
 */
BchNetworks.disableRegtest = function() {
  regtestEnabled = false;
};

/**
 * @namespace Networks
 */
module.exports = {
  add: Networks.add,
  remove: Networks.remove,
  get: BchNetworks.get,
  getProtocols: BchNetworks.getProtocols,
  getProtocol: BchNetworks.getLivenetProtocol,
  enableRegtest: BchNetworks.enableRegtest,
  disableRegtest: BchNetworks.disableRegtest,
  defaultNetwork: BchNetworks.get('bch'),
  livenet: BchNetworks.get('bch'),
  mainnet: BchNetworks.get('bch'),
  testnet: BchNetworks.get('bchtest'),
  regtest: BchNetworks.get('bchreg')
};
