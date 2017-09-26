'use strict';

var bcccore = {};
var owsCommon = require('ows-common');

// module information
bcccore.version = 'v' + require('./package.json').version;

// crypto
bcccore.crypto = {};
bcccore.crypto.BN = owsCommon.crypto.BN;
bcccore.crypto.ECDSA = require('./lib/crypto/ecdsa');
bcccore.crypto.Hash = owsCommon.crypto.Hash;
bcccore.crypto.Random = owsCommon.crypto.Random;
bcccore.crypto.Point = require('./lib/crypto/point');
bcccore.crypto.Signature = require('./lib/crypto/signature');

// encoding
bcccore.encoding = {};
bcccore.encoding.Base58 = owsCommon.encoding.Base58;
bcccore.encoding.Base58Check = owsCommon.encoding.Base58Check;
bcccore.encoding.BufferReader = owsCommon.encoding.BufferReader;
bcccore.encoding.BufferWriter = owsCommon.encoding.BufferWriter;
bcccore.encoding.Varint = owsCommon.encoding.Varint;

// utilities
bcccore.util = {};
bcccore.util.buffer = owsCommon.util.buffer;
bcccore.util.js = owsCommon.util.js;
bcccore.util.preconditions = owsCommon.util.preconditions;

// errors thrown by the library
bcccore.errors = owsCommon.errors;

// main bitcoin library
bcccore.Address = require('./lib/address');
bcccore.Block = require('./lib/block');
bcccore.Constants = require('./lib/common/Constants');
bcccore.MerkleBlock = require('./lib/block/merkleblock');
bcccore.BlockHeader = require('./lib/block/blockheader');
bcccore.HDPrivateKey = require('./lib/hdprivatekey.js');
bcccore.HDPublicKey = require('./lib/hdpublickey.js');
bcccore.Networks = require('./lib/networks');
bcccore.Opcode = require('./lib/opcode');
bcccore.PrivateKey = require('./lib/privatekey');
bcccore.PublicKey = require('./lib/publickey');
bcccore.Script = require('./lib/script');
bcccore.Transaction = require('./lib/transaction');
bcccore.URI = require('./lib/uri');
bcccore.Unit = require('./lib/unit');

// dependencies, subject to change
bcccore.deps = {};
bcccore.deps.bnjs = owsCommon.deps.bnjs;
bcccore.deps.bs58 = owsCommon.deps.bs58;
bcccore.deps.Buffer = owsCommon.deps.Buffer;
bcccore.deps.elliptic = require('elliptic');
bcccore.deps._ = owsCommon.deps._;

// Internal usage, exposed for testing/advanced tweaking
bcccore.Transaction.sighash = require('./lib/transaction/sighash');

module.exports = bcccore;
