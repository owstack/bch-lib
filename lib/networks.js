'use strict';

var networkLib = require('@owstack/network-lib');
var Networks = networkLib.Networks;
var Bip44 = Networks.Bip44;

var preference = 'BCH';
var regtestEnabled = false;

/**
 * For object definition see https://github.com/owstack/key-lib/blob/master/lib/networks.js
 */
var networks = [{
	name: 'Bitcoin Cash',
	symbol: 'BCH',
	coin: Bip44['BCH'] ^ 0x80000000,
	protocol: 'bitcoincash',
	alias: 'livenet',
	preference: preference,
	prefix: {
	  pubkeyhash: 0x00,
	  privatekey: 0x80,
	  scripthash: 0x05,
	},
	version: {
	  xpubkey: 0x03f72812, // 'qpub..' (no BCH version strings registered); see SLIP132
	  xprivkey: 0x03f723d8 // 'qprv..' (no BCH version strings registered); see SLIP132
	},
  networkMagic: 0xe3e1f3e8,
	port: 8333,
	dnsSeeds: [
    'seed.bitcoinabc.org',
    'seed-abc.bitcoinforks.org',
    'btccash-seeder.bitcoinunlimited.info',
    'seed.bitprim.org ',
    'seed.deadalnix.me'
	],
	indexBy: Networks.indexAll
}, {
	name: 'BCH Regtest',
	symbol: 'BCHREG',
	coin: Bip44['TESTNET'] ^ 0x80000000,
	protocol: 'bchreg',
	alias: 'testnet',
	preference: preference,
	prefix: {
		pubkeyhash: 0x6f,
	  privatekey: 0xef,
	  scripthash: 0xc4
	},
	version: {
	  xpubkey: 0x0435dbaa, // 'tqpb..' (no BCH testnet version strings registered); see SLIP132
	  xprivkey: 0x0435dc2e // 'tqpv..' (no BCH testnet version strings registered); see SLIP132
	},
  networkMagic: 0xdab5bffa,
	port: 18444,
	dnsSeeds: [],
	indexBy: Networks.indexMinimal
}, {
	name: 'BCH Testnet',
	symbol: 'BCHTEST',
	coin: Bip44['TESTNET'] ^ 0x80000000,
	protocol: 'bchtest',
	alias: 'testnet',
	preference: preference,
	prefix: {
		pubkeyhash: 0x6f,
	  privatekey: 0xef,
	  scripthash: 0xc4
	},
	version: {
	  xpubkey: 0x0435dbaa, // 'tqpb..' (no BCH testnet version strings registered); see SLIP132
	  xprivkey: 0x0435dc2e // 'tqpv..' (no BCH testnet version strings registered); see SLIP132
	},
	networkMagic: 0x0b110907,
	port: 18333,
	dnsSeeds: [
		'testnet-seed.bitcoin.petertodd.org',
    'testnet-seed.bluematt.me',
    'testnet-seed.alexykot.me',
    'testnet-seed.bitcoin.schildbach.de'
	],
	indexBy: Networks.indexAll
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
	  		network = Networks.get('BCH', keys, preference);
	  		break;

	  	case 'testnet':
	  		if (regtestEnabled) {
		  		network = Networks.get('BCHREG', keys, preference);
		  	} else {
		  		network = Networks.get('BCHTEST', keys, preference);
		  	}
	  		break;

	  	case 'regtest':
	  		network = Networks.get('BCHREG', keys, preference);
	  		break;
	  }
  }

  if (!network) {
  	// Prefer this network (third arg).
		network = Networks.get(arg, keys, preference);
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
  defaultNetwork: BchNetworks.get('BCH'),
  livenet: BchNetworks.get('BCH'),
  mainnet: BchNetworks.get('BCH'),
  testnet: BchNetworks.get('BCHTEST'),
  regtest: BchNetworks.get('BCHREG')
};
