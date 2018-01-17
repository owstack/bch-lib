'use strict';

var owsCommon = require('@owstack/ows-common');

// module information
module.exports.version = 'v' + require('./package.json').version;

// crypto
module.exports.crypto = {};
module.exports.crypto.BN = owsCommon.crypto.BN;
module.exports.crypto.ECDSA = require('./lib/crypto/ecdsa');
module.exports.crypto.Hash = owsCommon.crypto.Hash;
module.exports.crypto.Random = owsCommon.crypto.Random;
module.exports.crypto.Point = require('./lib/crypto/point');
module.exports.crypto.Signature = require('./lib/crypto/signature');

// encoding
module.exports.encoding = {};
module.exports.encoding.Base58 = owsCommon.encoding.Base58;
module.exports.encoding.Base58Check = owsCommon.encoding.Base58Check;
module.exports.encoding.BufferReader = owsCommon.encoding.BufferReader;
module.exports.encoding.BufferWriter = owsCommon.encoding.BufferWriter;
module.exports.encoding.Varint = owsCommon.encoding.Varint;

// utilities
module.exports.util = {};
module.exports.util.buffer = owsCommon.util.buffer;
module.exports.util.js = owsCommon.util.js;
module.exports.util.preconditions = owsCommon.util.preconditions;

// errors thrown by the library
module.exports.errors = owsCommon.errors;

// main bitcoin library
module.exports.Address = require('./lib/address');
module.exports.Block = require('./lib/block');
module.exports.Constants = require('./lib/common/constants');
module.exports.MerkleBlock = require('./lib/block/merkleblock');
module.exports.BlockHeader = require('./lib/block/blockheader');
module.exports.HDPrivateKey = require('./lib/hdprivatekey.js');
module.exports.HDPublicKey = require('./lib/hdpublickey.js');
module.exports.Networks = require('./lib/networks');
module.exports.Opcode = require('./lib/opcode');
module.exports.PrivateKey = require('./lib/privatekey');
module.exports.PublicKey = require('./lib/publickey');
module.exports.Script = require('./lib/script');
module.exports.Transaction = require('./lib/transaction');
module.exports.URI = require('./lib/uri');
module.exports.Unit = require('./lib/unit');

// dependencies, subject to change
module.exports.deps = {};
module.exports.deps.bnjs = owsCommon.deps.bnjs;
module.exports.deps.bs58 = owsCommon.deps.bs58;
module.exports.deps.Buffer = owsCommon.deps.Buffer;
module.exports.deps.elliptic = require('elliptic');
module.exports.deps._ = owsCommon.deps._;

// Internal usage, exposed for testing/advanced tweaking
module.exports.Transaction.sighash = require('./lib/transaction/sighash');
