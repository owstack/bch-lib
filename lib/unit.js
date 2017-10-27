'use strict';

var owsCommon = require('@owstack/ows-common');
var errors = owsCommon.errors;
var _ = owsCommon.deps._;
var $ = owsCommon.util.preconditions;

var UNITS =
  [{
    name: 'Bitcoin Cash',
    shortName: 'BCH',
    value: 100000000,
    decimals: 8,
    code: 'BCH',
    kind: 'standard'
  }, {
    name: 'mBCH (1,000 mBCH = 1BCH)',
    shortName: 'mBCH',
    value: 100000,
    decimals: 5,
    code: 'mBCH',
    kind: 'alternative'
  }, {
    name: 'uBCH (1,000,000 uBCH = 1BCH)',
    shortName: 'uBCH',
    value: 100,
    decimals: 2,
    code: 'uBCH',
    kind: 'alternative'
  }, {
    name: 'bits (1,000,000 bits = 1BCH)',
    shortName: 'bits',
    value: 100,
    decimals: 2,
    code: 'bit',
    kind: 'alternative'
  }, {
    name: 'satoshi (100,000,000 satoshi = 1BCH)',
    shortName: 'satoshis',
    value: 1,
    decimals: 0,
    code: 'satoshi',
    kind: 'atomic'
  }];

/**
 * Utility for handling and converting bitcoins units. The supported units are
 * BCH, mBCH, bits (also named uBCH) and satoshis. A unit instance can be created with an
 * amount and a unit code, or alternatively using static methods like {fromBCH}.
 * It also allows to be created from a fiat amount and the exchange rate, or
 * alternatively using the {fromFiat} static method.
 * You can consult for different representation of a unit instance using it's
 * {to} method, the fixed unit methods like {toSatoshis} or alternatively using
 * the unit accessors. It also can be converted to a fiat amount by providing the
 * corresponding BCH/fiat exchange rate.
 *
 * @example
 * ```javascript
 * var sats = Unit.fromBCH(1.3).toSatoshis();
 * var mili = Unit.fromBits(1.3).to(Unit.mBCH);
 * var bits = Unit.fromFiat(1.3, 350).bits;
 * var btc = new Unit(1.3, Unit.bits).BCH;
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

  // convert fiat to BCH
  if (_.isNumber(code)) {
    if (code <= 0) {
      throw new errors.Unit.InvalidRate(code);
    }
    amount = amount / code;
    code = Unit.BCH;
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
 * Returns a Unit instance created from an amount in BCH
 *
 * @param {Number} amount - The amount in BCH
 * @returns {Unit} A Unit instance
 */
Unit.fromBCH = function(amount) {
  return new Unit(amount, Unit.BCH);
};

/**
 * Returns a Unit instance created from an amount in mBCH
 *
 * @param {Number} amount - The amount in mBCH
 * @returns {Unit} A Unit instance
 */
Unit.fromMillis = Unit.fromMilis = function(amount) {
  return new Unit(amount, Unit.mBCH);
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
 * @param {Number} rate - The exchange rate BCH/fiat
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
    return parseFloat((this.BCH * code).toFixed(2));
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
 * Returns the value represented in BCH
 *
 * @returns {Number} The value converted to BCH
 */
Unit.prototype.toBCH = function() {
  return this.to(Unit.BCH);
};

/**
 * Returns the value represented in mBCH
 *
 * @returns {Number} The value converted to mBCH
 */
Unit.prototype.toMillis = Unit.prototype.toMilis = function() {
  return this.to(Unit.mBCH);
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
 * @param {string} rate - The exchange rate between BCH/currency
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
    amount: this.BCH,
    code: Unit.BCH
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
