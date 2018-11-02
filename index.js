'use strict';

var bchLib = {};
var owsCommon = require('@owstack/ows-common');
var keyLib = require('@owstack/key-lib');

// module information
bchLib.version = 'v' + require('./package.json').version;
/*
// crypto
bchLib.crypto = {};
bchLib.crypto.BN = owsCommon.crypto.BN;
bchLib.crypto.ECDSA = keyLib.crypto.ECDSA;
bchLib.crypto.Hash = keyLib.crypto.Hash;
bchLib.crypto.Random = owsCommon.crypto.Random;
bchLib.crypto.Point = keyLib.crypto.Point;
bchLib.crypto.Signature = keyLib.crypto.Signature;

// encoding
bchLib.encoding = {};
bchLib.encoding.Base58 = owsCommon.encoding.Base58;
bchLib.encoding.Base58Check = owsCommon.encoding.Base58Check;
bchLib.encoding.BufferReader = owsCommon.encoding.BufferReader;
bchLib.encoding.BufferWriter = owsCommon.encoding.BufferWriter;
bchLib.encoding.Varint = owsCommon.encoding.Varint;

// keys
bchLib.HDPrivateKey = keyLib.HDPrivateKey;
bchLib.HDPublicKey = keyLib.HDPublicKey;
bchLib.Networks = keyLib.Networks;
bchLib.PrivateKey = keyLib.PrivateKey;
bchLib.PublicKey = keyLib.PublicKey;

// utilities
bchLib.util = {};
bchLib.util.buffer = owsCommon.util.buffer;
bchLib.util.js = owsCommon.util.js;
bchLib.util.preconditions = owsCommon.util.preconditions;

// errors thrown by the library
bchLib.errors = owsCommon.errors;
*/
// main bitcoin library
bchLib.Address = require('./lib/address');
bchLib.Block = require('./lib/block');
bchLib.Constants = require('./lib/common/constants');
bchLib.MerkleBlock = require('./lib/block/merkleblock');
bchLib.Networks = require('./lib/networks');
bchLib.BlockHeader = require('./lib/block/blockheader');
bchLib.Opcode = require('./lib/opcode');
bchLib.Script = require('./lib/script');
bchLib.Transaction = require('./lib/transaction');
bchLib.URI = require('./lib/uri');
bchLib.Unit = require('./lib/unit');
/*
// dependencies, subject to change
bchLib.deps = {};
bchLib.deps.bnjs = owsCommon.deps.bnjs;
bchLib.deps.bs58 = owsCommon.deps.bs58;
bchLib.deps.Buffer = owsCommon.deps.Buffer;
bchLib.deps.elliptic = require('elliptic');
bchLib.deps._ = owsCommon.deps._;
*/
// Internal usage, exposed for testing/advanced tweaking
bchLib.Transaction.sighash = require('./lib/transaction/sighash');

module.exports = bchLib;
