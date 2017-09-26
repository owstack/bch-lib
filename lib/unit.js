'use strict';

var errors = require('./errors');
var _ = require('lodash');
var $ = require('./util/preconditions');

var UNITS =
  [{
    name: 'Bitcoin Cash',
    shortName: 'BCC',
    value: 100000000,
    decimals: 8,
    code: 'BCC',
    kind: 'standard'
  }, {
    name: 'mBCC (1,000 mBCC = 1BCC)',
    shortName: 'mBCC',
    value: 100000,
    decimals: 5,
    code: 'mBCC',
    kind: 'alternative'
  }, {
    name: 'uBCC (1,000,000 uBCC = 1BCC)',
    shortName: 'uBCC',
    value: 100,
    decimals: 2,
    code: 'uBCC',
    kind: 'alternative'
  }, {
    name: 'bits (1,000,000 bits = 1BCC)',
    shortName: 'bits',
    value: 100,
    decimals: 2,
    code: 'bit',
    kind: 'alternative'
  }, {
    name: 'satoshi (100,000,000 satoshi = 1BCC)',
    shortName: 'satoshis',
    value: 1,
    decimals: 0,
    code: 'satoshi',
    kind: 'atomic'
  }];

/**
 * Utility for handling and converting bitcoins units. The supported units are
 * BCC, mBCC, bits (also named uBCC) and satoshis. A unit instance can be created with an
 * amount and a unit code, or alternatively using static methods like {fromBCC}.
 * It also allows to be created from a fiat amount and the exchange rate, or
 * alternatively using the {fromFiat} static method.
 * You can consult for different representation of a unit instance using it's
 * {to} method, the fixed unit methods like {toSatoshis} or alternatively using
 * the unit accessors. It also can be converted to a fiat amount by providing the
 * corresponding BCC/fiat exchange rate.
 *
 * @example
 * ```javascript
 * var sats = Unit.fromBCC(1.3).toSatoshis();
 * var mili = Unit.fromBits(1.3).to(Unit.mBCC);
 * var bits = Unit.fromFiat(1.3, 350).bits;
 * var btc = new Unit(1.3, Unit.bits).BCC;
 * ```
 *
 * @param {Number} amount - The amount to be represented
 * @param {String|Number} code - The unit of the amount or the exchange rate
 * @returns {Unit} A new instance of an Unit
 * @constructor
 */
function Unit(amount, code) {
  if (!(this instanceof Unit)) {
    return new Unit(amount, code);
  }

  // convert fiat to BCC
  if (_.isNumber(code)) {
    if (code <= 0) {
      throw new errors.Unit.InvalidRate(code);
    }
    amount = amount / code;
    code = Unit.BCC;
  }

  this._value = this._from(amount, code);

  var self = this;
  var defineAccesor = function(key) {
    Object.defineProperty(self, key, {
      get: function() { return self.to(key); },
      enumerable: true,
    });
  };

  var keys = _.map(UNITS, function(u) {
    return u.shortName;
  });

  keys.forEach(defineAccesor);
}

var keys = _.map(UNITS, function(u) {
  return u.shortName;
});

keys.forEach(function(key) {
  Unit[key] = key;
});

/**
 * Returns the available units
 *
 * @returns {array} An array of available units
 */
Unit.getUnits = function getUnits() {
  return UNITS;
};

/**
 * Returns a Unit instance created from JSON string or object
 *
 * @param {String|Object} json - JSON with keys: amount and code
 * @returns {Unit} A Unit instance
 */
Unit.fromObject = function fromObject(data) {
  $.checkArgument(_.isObject(data), 'Argument is expected to be an object');
  return new Unit(data.amount, data.code);
};

/**
 * Returns a Unit instance created from an amount in BCC
 *
 * @param {Number} amount - The amount in BCC
 * @returns {Unit} A Unit instance
 */
Unit.fromBCC = function(amount) {
  return new Unit(amount, Unit.BCC);
};

/**
 * Returns a Unit instance created from an amount in mBCC
 *
 * @param {Number} amount - The amount in mBCC
 * @returns {Unit} A Unit instance
 */
Unit.fromMillis = Unit.fromMilis = function(amount) {
  return new Unit(amount, Unit.mBCC);
};

/**
 * Returns a Unit instance created from an amount in bits
 *
 * @param {Number} amount - The amount in bits
 * @returns {Unit} A Unit instance
 */
Unit.fromMicros = Unit.fromBits = function(amount) {
  return new Unit(amount, Unit.bits);
};

/**
 * Returns a Unit instance created from an amount in satoshis
 *
 * @param {Number} amount - The amount in satoshis
 * @returns {Unit} A Unit instance
 */
Unit.fromSatoshis = function(amount) {
  return new Unit(amount, Unit.satoshis);
};

/**
 * Returns a Unit instance created from a fiat amount and exchange rate.
 *
 * @param {Number} amount - The amount in fiat
 * @param {Number} rate - The exchange rate BCC/fiat
 * @returns {Unit} A Unit instance
 */
Unit.fromFiat = function(amount, rate) {
  return new Unit(amount, rate);
};

Unit.prototype._from = function(amount, code) {
  var unit = _.find(UNITS, function(u) {
    return u.shortName == code;
  });

  if (!unit) {
    throw new errors.Unit.UnknownCode(code);
  }
  return parseInt((amount * unit.value).toFixed());
};

/**
 * Returns the value represented in the specified unit
 *
 * @param {String|Number} code - The unit code or exchange rate
 * @returns {Number} The converted value
 */
Unit.prototype.to = function(code) {
  if (_.isNumber(code)) {
    if (code <= 0) {
      throw new errors.Unit.InvalidRate(code);
    }
    return parseFloat((this.BCC * code).toFixed(2));
  }

  var unit = _.find(UNITS, function(u) {
    return u.shortName == code;
  });

  if (!unit) {
    throw new errors.Unit.UnknownCode(code);
  }

  var value = this._value / unit.value;
  return parseFloat(value.toFixed(unit.decimals));
};

/**
 * Returns the value represented in BCC
 *
 * @returns {Number} The value converted to BCC
 */
Unit.prototype.toBCC = function() {
  return this.to(Unit.BCC);
};

/**
 * Returns the value represented in mBCC
 *
 * @returns {Number} The value converted to mBCC
 */
Unit.prototype.toMillis = Unit.prototype.toMilis = function() {
  return this.to(Unit.mBCC);
};

/**
 * Returns the value represented in bits
 *
 * @returns {Number} The value converted to bits
 */
Unit.prototype.toMicros = Unit.prototype.toBits = function() {
  return this.to(Unit.bits);
};

/**
 * Returns the value represented in satoshis
 *
 * @returns {Number} The value converted to satoshis
 */
Unit.prototype.toSatoshis = function() {
  return this.to(Unit.satoshis);
};

/**
 * Returns the value represented in fiat
 *
 * @param {string} rate - The exchange rate between BCC/currency
 * @returns {Number} The value converted to satoshis
 */
Unit.prototype.atRate = function(rate) {
  return this.to(rate);
};

/**
 * Returns a the string representation of the value in satoshis
 *
 * @returns {string} the value in satoshis
 */
Unit.prototype.toString = function() {
  return this.satoshis + ' satoshis';
};

/**
 * Returns a plain object representation of the Unit
 *
 * @returns {Object} An object with the keys: amount and code
 */
Unit.prototype.toObject = Unit.prototype.toJSON = function toObject() {
  return {
    amount: this.BCC,
    code: Unit.BCC
  };
};

/**
 * Returns a string formatted for the console
 *
 * @returns {string} the value in satoshis
 */
Unit.prototype.inspect = function() {
  return '<Unit: ' + this.toString() + '>';
};

module.exports = Unit;
