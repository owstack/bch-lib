'use strict';

var should = require('chai').should();
var bcccore = require('../');

describe('#versionGuard', function() {
  it('global._bcccore should be defined', function() {
    should.equal(global._bcccore, bcccore.version);
  });

  it('throw an error if version is already defined', function() {
    (function() {
      bcccore.versionGuard('version');
    }).should.throw('More than one instance of bcccore-lib');
  });
});
