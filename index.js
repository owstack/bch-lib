'use strict';

var bchLib = {};
var owsCommon = require('@owstack/ows-common');

// module information
bchLib.version = 'v' + require('./package.json').version;

// crypto
bchLib.crypto = {};
bchLib.crypto.BN = owsCommon.crypto.BN;
bchLib.crypto.ECDSA = require('./lib/crypto/ecdsa');
bchLib.crypto.Hash = owsCommon.crypto.Hash;
bchLib.crypto.Random = owsCommon.crypto.Random;
bchLib.crypto.Point = require('./lib/crypto/point');
bchLib.crypto.Signature = require('./lib/crypto/signature');

// encoding
bchLib.encoding = {};
bchLib.encoding.Base58 = owsCommon.encoding.Base58;
bchLib.encoding.Base58Check = owsCommon.encoding.Base58Check;
bchLib.encoding.BufferReader = owsCommon.encoding.BufferReader;
bchLib.encoding.BufferWriter = owsCommon.encoding.BufferWriter;
bchLib.encoding.Varint = owsCommon.encoding.Varint;

// utilities
bchLib.util = {};
bchLib.util.buffer = owsCommon.util.buffer;
bchLib.util.js = owsCommon.util.js;
bchLib.util.preconditions = owsCommon.util.preconditions;

// errors thrown by the library
bchLib.errors = owsCommon.errors;

// main bitcoin library
bchLib.Address = require('./lib/address');
bchLib.Block = require('./lib/block');
bchLib.Constants = require('./lib/common/constants');
bchLib.MerkleBlock = require('./lib/block/merkleblock');
bchLib.BlockHeader = require('./lib/block/blockheader');
bchLib.HDPrivateKey = require('./lib/hdprivatekey.js');
bchLib.HDPublicKey = require('./lib/hdpublickey.js');
bchLib.Networks = require('./lib/networks');
bchLib.Opcode = require('./lib/opcode');
bchLib.PrivateKey = require('./lib/privatekey');
bchLib.PublicKey = require('./lib/publickey');
bchLib.Script = require('./lib/script');
bchLib.Transaction = require('./lib/transaction');
bchLib.URI = require('./lib/uri');
bchLib.Unit = require('./lib/unit');

// dependencies, subject to change
bchLib.deps = {};
bchLib.deps.bnjs = owsCommon.deps.bnjs;
bchLib.deps.bs58 = owsCommon.deps.bs58;
bchLib.deps.Buffer = owsCommon.deps.Buffer;
bchLib.deps.elliptic = require('elliptic');
bchLib.deps._ = owsCommon.deps._;

// Internal usage, exposed for testing/advanced tweaking
bchLib.Transaction.sighash = require('./lib/transaction/sighash');

module.exports = bchLib;
