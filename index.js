'use strict';

var bchLib = require('./lib');

bchLib.Transaction.Sighash = require('./lib/transaction/sighash');
bchLib.Transaction.UnspentOutput = require('./lib/transaction/unspentoutput');
bchLib.URI = require('./lib/uri');
bchLib.Unit = require('./lib/unit');

// Internal usage, exposed for testing/advanced tweaking
bchLib.Transaction.sighash = require('./lib/transaction/sighash');

module.exports = bchLib;
