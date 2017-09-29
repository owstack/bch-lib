'use strict';

var bch = {};
var owsCommon = require('ows-common');

// module information
bch.version = 'v' + require('./package.json').version;

// crypto
bch.crypto = {};
bch.crypto.BN = owsCommon.crypto.BN;
bch.crypto.ECDSA = require('./lib/crypto/ecdsa');
bch.crypto.Hash = owsCommon.crypto.Hash;
bch.crypto.Random = owsCommon.crypto.Random;
bch.crypto.Point = require('./lib/crypto/point');
bch.crypto.Signature = require('./lib/crypto/signature');

// encoding
bch.encoding = {};
bch.encoding.Base58 = owsCommon.encoding.Base58;
bch.encoding.Base58Check = owsCommon.encoding.Base58Check;
bch.encoding.BufferReader = owsCommon.encoding.BufferReader;
bch.encoding.BufferWriter = owsCommon.encoding.BufferWriter;
bch.encoding.Varint = owsCommon.encoding.Varint;

// utilities
bch.util = {};
bch.util.buffer = owsCommon.util.buffer;
bch.util.js = owsCommon.util.js;
bch.util.preconditions = owsCommon.util.preconditions;

// errors thrown by the library
bch.errors = owsCommon.errors;

// main bitcoin library
bch.Address = require('./lib/address');
bch.Block = require('./lib/block');
bch.Constants = require('./lib/common/constants');
bch.MerkleBlock = require('./lib/block/merkleblock');
bch.BlockHeader = require('./lib/block/blockheader');
bch.HDPrivateKey = require('./lib/hdprivatekey.js');
bch.HDPublicKey = require('./lib/hdpublickey.js');
bch.Networks = require('./lib/networks');
bch.Opcode = require('./lib/opcode');
bch.PrivateKey = require('./lib/privatekey');
bch.PublicKey = require('./lib/publickey');
bch.Script = require('./lib/script');
bch.Transaction = require('./lib/transaction');
bch.URI = require('./lib/uri');
bch.Unit = require('./lib/unit');

// dependencies, subject to change
bch.deps = {};
bch.deps.bnjs = owsCommon.deps.bnjs;
bch.deps.bs58 = owsCommon.deps.bs58;
bch.deps.Buffer = owsCommon.deps.Buffer;
bch.deps.elliptic = require('elliptic');
bch.deps._ = owsCommon.deps._;

// Internal usage, exposed for testing/advanced tweaking
bch.Transaction.sighash = require('./lib/transaction/sighash');

module.exports = bch;
