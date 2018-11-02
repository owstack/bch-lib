'use strict';

var bchLib = {};
var owsCommon = require('@owstack/ows-common');
var keyLib = require('@owstack/key-lib');

// Module information
bchLib.version = 'v' + require('./package.json').version;

// Main bitcoin cash library
bchLib.Address = require('./lib/address');
bchLib.Block = require('./lib/block');
bchLib.BlockHeader = require('./lib/block/blockheader');
bchLib.MerkleBlock = require('./lib/block/merkleblock');
bchLib.Networks = require('./lib/networks');
bchLib.Opcode = require('./lib/opcode');
bchLib.Script = require('./lib/script');
bchLib.Transaction = require('./lib/transaction');
bchLib.URI = require('./lib/uri');
bchLib.Unit = require('./lib/unit');

// Internal usage, exposed for testing/advanced tweaking
bchLib.Transaction.sighash = require('./lib/transaction/sighash');

module.exports = bchLib;
