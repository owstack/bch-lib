var satoshiCommon = require('@owstack/satoshi-common-lib');
var inherits = require('inherits');

var Interpreter = function Interpreter(obj) {
  satoshiCommon.Script.Interpreter.call(this, obj);
};

inherits(Interpreter, satoshiCommon.Script.Interpreter);

// enable SIGHASH_FORKID replay protection
Interpreter.SCRIPT_ENABLE_SIGHASH_FORKID = (1 << 16);

module.exports = Interpreter;
