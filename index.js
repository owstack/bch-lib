'use strict';

var bchLib = require('./lib');

var Sighash = require('./lib/transaction/sighash');
bchLib.Transaction.Sighash.sighash = Sighash.sighash;
bchLib.Transaction.Sighash.sign = Sighash.sign;
bchLib.Transaction.Sighash.verify = Sighash.verify;
bchLib.Transaction.UnspentOutput = require('./lib/transaction/unspentoutput');

bchLib.URI = require('./lib/uri');
bchLib.Unit = require('./lib/unit');

// Internal usage, exposed for testing/advanced tweaking
bchLib.Transaction.sighash = require('./lib/transaction/sighash');

module.exports = bchLib;
