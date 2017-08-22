'use strict';

var bcccore = module.exports;

// module information
bcccore.version = 'v' + require('./package.json').version;
bcccore.versionGuard = function(version) {
  if (version !== undefined && version != global._bcccore) {
    var message = 'More than one instance of bcccore-lib found. ' +
      'Please make sure to require bcccore-lib and check that submodules do' +
      ' not also include their own different version of bcccore-lib dependency.';
    throw new Error(message);
  }
};
bcccore.versionGuard(global._bcccore);
global._bcccore = bcccore.version;

// crypto
bcccore.crypto = {};
bcccore.crypto.BN = require('./lib/crypto/bn');
bcccore.crypto.ECDSA = require('./lib/crypto/ecdsa');
bcccore.crypto.Hash = require('./lib/crypto/hash');
bcccore.crypto.Random = require('./lib/crypto/random');
bcccore.crypto.Point = require('./lib/crypto/point');
bcccore.crypto.Signature = require('./lib/crypto/signature');

// encoding
bcccore.encoding = {};
bcccore.encoding.Base58 = require('./lib/encoding/base58');
bcccore.encoding.Base58Check = require('./lib/encoding/base58check');
bcccore.encoding.BufferReader = require('./lib/encoding/bufferreader');
bcccore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
bcccore.encoding.Varint = require('./lib/encoding/varint');

// utilities
bcccore.util = {};
bcccore.util.buffer = require('./lib/util/buffer');
bcccore.util.js = require('./lib/util/js');
bcccore.util.preconditions = require('./lib/util/preconditions');

// errors thrown by the library
bcccore.errors = require('./lib/errors');

// main bitcoin cash library
bcccore.Address = require('./lib/address');
bcccore.Block = require('./lib/block');
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
bcccore.deps.bnjs = require('bn.js');
bcccore.deps.bs58 = require('bs58');
bcccore.deps.Buffer = Buffer;
bcccore.deps.elliptic = require('elliptic');
bcccore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
bcccore.Transaction.sighash = require('./lib/transaction/sighash');
