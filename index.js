'use strict';

var bchLib = {};

// Module information
bchLib.version = 'v' + require('./package.json').version;

// Main bitcoin cash library
bchLib.Address = require('./lib/address');
bchLib.Block = require('./lib/block');
bchLib.BlockHeader = require('./lib/block/blockheader');
bchLib.Defaults = require('./lib/common/defaults');
bchLib.MerkleBlock = require('./lib/block/merkleblock');
bchLib.Networks = require('./lib/networks');
bchLib.Opcode = require('./lib/opcode');
bchLib.Script = require('./lib/script');
bchLib.Transaction = require('./lib/transaction');
bchLib.Unit = require('./lib/unit');
bchLib.URI = require('./lib/uri');

// Internal usage, exposed for testing/advanced tweaking
bchLib.Transaction.sighash = require('./lib/transaction/sighash');

// Inject this library into each of its networks as network.lib.
var bchNetworks = require('@owstack/network-lib').getFiltered({currency: bchLib.Networks.currency});
for (var i = 0; i < bchNetworks.length; i++) {
	bchNetworks[i].lib = bchLib;
}

module.exports = bchLib;
