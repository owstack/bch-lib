'use strict';

var owsCommon = require('@owstack/ows-common');
var keyLib = require('@owstack/key-lib');
var Unit = keyLib.Unit;
var inherits = require('inherits');
var lodash = owsCommon.deps.lodash;
var $ = owsCommon.util.preconditions;

var UNITS = [{
    name: 'Bitcoin Cash',
    shortName: 'BCH',
    value: 100000000,
    decimals: 8,
    code: 'BCH',
    kind: 'standard',
  }, {
    name: 'mBCH (1,000 mBCH = 1BCH)',
    shortName: 'mBCH',
    value: 100000,
    decimals: 5,
    code: 'mBCH',
    kind: 'millis'
  }, {
    name: 'uBCH (1,000,000 uBCH = 1BCH)',
    shortName: 'uBCH',
    value: 100,
    decimals: 2,
    code: 'uBCH',
    kind: 'micros'
  }, {
    name: 'bits (1,000,000 bits = 1BCH)',
    shortName: 'bits',
    value: 100,
    decimals: 2,
    code: 'bit',
    kind: 'bits'
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
function BchUnit(amount, code) {
  Unit.apply(this, [UNITS, amount, code]);
};
inherits(BchUnit, Unit);

// Copy all static methods in our object.
Object.keys(Unit).forEach(function(key) {
  BchUnit[key] = Unit[key];
});

/**
 * Create unit statics.
 * Example BchUnit.BCH
 */
var unitKeys = lodash.map(UNITS, function(u) {
  return u.shortName;
});

unitKeys.forEach(function(key) {
  BchUnit[key] = key;
});

/**
 * Constructors.
 * Returns a Unit instance created from the standard unit of measure.
 *
 * @param {Number} amount - The amount in standard units
 * @returns {Unit} A Unit instance
 */

BchUnit.fromBCH = BchUnit.fromStandardUnit = function(amount) {
  return new BchUnit(amount, BchUnit.BCH);
};

BchUnit.fromMillis = function(amount) {
  return new BchUnit(amount, BchUnit.mBCH);
};

BchUnit.fromMicro = function(amount) {
  return new BchUnit(amount, BchUnit.uBCH);
};

BchUnit.fromBits = function(amount) {
  return new BchUnit(amount, BchUnit.bits);
};

BchUnit.fromSatoshis = BchUnit.fromAtomicUnit = function(amount) {
  return new BchUnit(amount, BchUnit.satoshis);
};

/**
 * Converters.
 * Returns a Unit instance created from the atomic unit of measure.
 *
 * @param {Number} amount - The amount in atomic units
 * @returns {Unit} A Unit instance
 */

BchUnit.prototype.toBCH = function() {
  return this.to(BchUnit.BCH);
};

BchUnit.prototype.toMillis = function() {
  return this.to(BchUnit.mBCH);
};

BchUnit.prototype.toMicro = function() {
  return this.to(BchUnit.uBCH);
};

BchUnit.prototype.toBits = function() {
  return this.to(BchUnit.bits);
};

BchUnit.prototype.toSatoshis = function() {
  return this.to(BchUnit.satoshis);
};

/**
 * Returns a Unit instance created from a fiat amount and exchange rate.
 *
 * @param {Number} amount - The amount in fiat
 * @param {Number} rate - The exchange rate; example BTC/USD
 * @returns {Unit} A Unit instance
 */
BchUnit.fromFiat = function(amount, rate) {
  return new BchUnit(amount, rate);
};

/**
 * Returns a Unit instance created from JSON string or object
 *
 * @param {String|Object} json - JSON with keys: amount and code
 * @returns {Unit} A Unit instance
 */
BchUnit.fromObject = function(data) {
  $.checkArgument(lodash.isObject(data), 'Argument is expected to be an object');
  return new BchUnit(data.amount, data.code);
};

module.exports = BchUnit;
