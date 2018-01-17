'use strict';

var satoshiCommon = require('@owstack/satoshi-common-lib');

module.exports = satoshiCommon;

// module information
module.exports.version = 'v' + require('./package.json').version;

module.exports.crypto.Signature = require('./lib/crypto/signature');

// main bitcoin library
module.exports.Constants = require('./lib/common/constants');
module.exports.Networks = require('./lib/networks');
module.exports.Transaction.Sighash = require('./lib/transaction/sighash');
module.exports.Transaction.UnspentOutput = require('./lib/transaction/unspentoutput');
module.exports.URI = require('./lib/uri');
module.exports.Unit = require('./lib/unit');

// Internal usage, exposed for testing/advanced tweaking
module.exports.Transaction.sighash = require('./lib/transaction/sighash');
