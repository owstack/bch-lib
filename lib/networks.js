'use strict';

var keyLib = require('@owstack/key-lib');
var Networks = keyLib.Networks;
var Bip44 = Networks.Bip44;

var preference = 'BCH';
var regtestEnabled = false;

/**
 * For object definition see https://github.com/owstack/key-lib/blob/master/lib/networks.js
 */
Networks.add([{
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
}]);

/*
var indexBy = [
	'name',
	'symbol',
	'coin',
	'protocol',
	'prefix.pubkeyhash',
	'prefix.privatekey',
	'prefix.scripthash', 
	'version.xpubkey',
	'version.xprivkey'
];

var definedNetworks = {
	'BCH': {
		name: 'Bitcoin Cash',
		symbol: 'BCH',
		coin: Bip44['BCH'] ^ 0x80000000,
		protocol: {
			livenet: 'bitcoincash',
			testnet: 'bchtest',
			regtest: 'bchreg'
		},
		prefix: {
		  pubkeyhash: 0x00,
		  privatekey: 0x80,
		  scripthash: 0x05,
		},
		version: {
		  xpubkey: 0x0488b21f, // using BTC version strings +1 (no BCH version strings registered); see SLIP132
		  xprivkey: 0x0488ade5
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
		indexBy: indexBy
	},
	'BTC': {
		name: 'Bitcoin',
		symbol: 'BTC',
		coin: Bip44['BTC'] ^ 0x80000000,
		protocol: {
			livenet: 'bitcoin',
			testnet: 'testnet',
			regtest: 'regtest'
		},
		prefix: {
		  pubkeyhash: 0x00,
		  privatekey: 0x80,
		  scripthash: 0x05,
		},
		version: {
		  xpubkey: 0x0488b21e,
		  xprivkey: 0x0488ade4
		},
	  networkMagic: 0xf9beb4d9,
		port: 8333,
		dnsSeeds: [
	    'seed.bitcoin.sipa.be',
	    'dnsseed.bluematt.me',
	    'dnsseed.bitcoin.dashjr.org',
	    'seed.bitcoinstats.com',
	    'seed.bitnodes.io',
	    'bitseed.xf2.org'
		],
		indexBy: indexBy
	},
	'LTC': {
		name: 'Litecoin',
		symbol: 'LTC',
		coin: Bip44['LTC'] ^ 0x80000000,
		protocol: {
			livenet: 'litecoin',
			testnet: 'testnet',
			regtest: 'regtest'
		},
		prefix: {
			pubkeyhash: 0x30,
		  privatekey: 0xb0,
		  scripthash: 0x05,
		  scripthash2: 0x32,
		},
		version: {
		  xpubkey: 0x019da462,
		  xprivkey: 0x019d9cfe,
		},
	  networkMagic: 0xfbc0b6db,
		port: 9333,
		dnsSeeds: [
	    'dnsseed.litecointools.com',
	    'dnsseed.litecoinpool.org',
	    'dnsseed.ltc.xurious.com',
	    'dnsseed.koin-project.com',
	    'seed-a.litecoin.loshan.co.uk',
	    'dnsseed.thrasher.io'
		],
		indexBy: indexBy
	},
	'regtest': {
		name: 'Regtest',
		symbol: 'REGTEST',
		coin: 0x00000001 ^ 0x80000000,
		protocol: 'regtest',
		prefix: {
			pubkeyhash: 0x6f,
		  privatekey: 0xef,
		  scripthash: 0xc4
		},
		version: {
		  xpubkey: 0x043587cf,
		  xprivkey: 0x04358394
		},
	  networkMagic: 0xdab5bffa,
		port: 18444,
		dnsSeeds: [],
		indexBy: [
	    'name',
	    'symbol',
			'protocol',
	    'networkMagic',
	    'port'
	  ]
	},
	'testnet': {
		name: 'Testnet',
		symbol: 'TESTNET',
		coin: 0x00000001 ^ 0x80000000,
		protocol: 'testnet',
		prefix: {
			pubkeyhash: 0x6f,
		  privatekey: 0xef,
		  scripthash: 0xc4
		},
		version: {
		  xpubkey: 0x043587cf,
		  xprivkey: 0x04358394
		},
	  networkMagic: 0x0b110907,
		port: 18333,
		dnsSeeds: [
			'testnet-seed.bitcoin.petertodd.org',
	    'testnet-seed.bluematt.me',
	    'testnet-seed.alexykot.me',
	    'testnet-seed.bitcoin.schildbach.de'
		],
		indexBy: indexBy
	}
};
*/

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
 * @member Networks#enableRegtest
 * Will enable regtest features for testnet
 */
function enableRegtest() {
  regtestEnabled = true;
};

/**
 * @function
 * @member Networks#disableRegtest
 * Will disable regtest features for testnet
 */
function disableRegtest() {
  regtestEnabled = false;
};

/**
 * @namespace Networks
 */
module.exports = {
  add: Networks.add,
  remove: Networks.remove,
  get: BchNetworks.get,
  enableRegtest: enableRegtest,
  disableRegtest: disableRegtest,
  defaultNetwork: BchNetworks.get('BCH'),
  livenet: BchNetworks.get('BCH'),
  mainnet: BchNetworks.get('BCH'),
  testnet: BchNetworks.get('BCHTEST'),
  regtest: BchNetworks.get('BCHREG')
};
