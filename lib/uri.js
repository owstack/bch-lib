'use strict';

var owsCommon = require('@owstack/ows-common');
var keyLib = require('@owstack/key-lib');
var Address = require('./address');
var Networks = require('./networks');
var Unit = require('./unit');
var URI = keyLib.URI;
var inherits = require('inherits');

/**
 * Represents a bitcoin cash URI.
 * @constructor
 */
function BchURI(amount, code) {
  URI.apply(this, [Address, Networks, Unit, amount, code]);
};
inherits(BchURI, URI);

// Access static methods.
Object.keys(URI).forEach(function(key) {
  BchURI[key] = URI[key];
});

/**
 * Check if an bitcoin cash URI string is valid
 *
 * @example
 * ```javascript
 *
 * var valid = URI.isValid('bitcoincash:12A1MyfXbW6RhdRAZEqofac5jCQQjwEPBu');
 * // true
 * ```
 *
 * @param {string|Object} data - A bitcoin cash URI string or an Object
 * @param {Array.<string>=} knownParams - Required non-standard params
 * @returns {boolean} Result of uri validation
 */
BchURI.isValid = function(arg, knownParams) {
  try {
    new BchURI(arg, knownParams);
  } catch (err) {
    return false;
  }
  return true;
};

/**
 * Returns the protocol string for the network.
 *
 * @returns {string} The protocol string
 */
BchURI.getProtocol = function() {
  return Networks.getProtocol();
};

/**
 * Convert a URI string into a simple object.
 *
 * @param {string} uri - A bitcoin cash URI string
 * @throws {TypeError} Invalid bitcoin cash URI
 * @returns {Object} An object with the parsed params
 */
BchURI.parse = function(uri) {
	return URI.parseWithNetworks(Networks.getProtocols(), uri);
};

/**
 * Instantiate a URI from a String
 *
 * @param {string} str - JSON string or object of the URI
 * @returns {URI} A new instance of a URI
 */
BchURI.fromString = function(str) {
  if (typeof(str) !== 'string') {
    throw new TypeError('Expected a string');
  }
  return new BchURI(str);
};

/**
 * Instantiate a URI from an Object
 *
 * @param {Object} data - object of the URI
 * @returns {URI} A new instance of a URI
 */
BchURI.fromObject = function(json) {
  return new BchURI(json);
};

module.exports = BchURI;
