'use strict';

/**
 * Copyright (c) 2018 Matias Alejo Garcia
 * Copyright (c) 2017 Emilio Almansi
 * Copyright (c) 2017 Pieter Wuille
 * See https://github.com/bitcoincashjs/cashaddrjs
*/

/**
 * Converts an array of integers made up of `from` bits into an
 * array of integers made up of `to` bits. The output array is
 * zero-padded if necessary, unless strict mode is true.
 * Original by Pieter Wuille: https://github.com/sipa/bech32.
 *
 * @param {Array} data Array of integers made up of `from` bits.
 * @param {number} from Length in bits of elements in the input array.
 * @param {number} to Length in bits of elements in the output array.
 * @param {bool} strict Require the conversion to be completed without padding.
 */
var owsCommon = require('@owstack/ows-common');
var $ = owsCommon.util.preconditions;

module.exports = function(data, from, to, strict) {
  strict = strict || false;
  var accumulator = 0;
  var bits = 0;
  var result = [];
  var mask = (1 << to) - 1;
  for (var i=0; i<data.length; i++) {
    var value = data[i];
    $.checkArgument(!(value < 0 || (value >> from) !== 0), 'value ' + value);

    accumulator = (accumulator << from) | value;
    bits += from;
    while (bits >= to) {
      bits -= to;
      result.push((accumulator >> bits) & mask);
    }
  }
  if (!strict) {
    if (bits > 0) {
      result.push((accumulator << (to - bits)) & mask);
    }
  } else {
   $.checkState(!(bits >= from || ((accumulator << (to - bits)) & mask)),  'Conversion requires padding but strict mode was used');
  }
  return result;
};
