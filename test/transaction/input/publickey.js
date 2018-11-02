'use strict';

var should = require('chai').should();

var keyLib = require('@owstack/key-lib');
var bchLib = require('../../..');
var Address = bchLib.Address;
var PrivateKey = keyLib.PrivateKey;
var Transaction = bchLib.Transaction;

describe('PublicKeyInput', function() {

  var utxo = {
    txid: '7f3b688cb224ed83e12d9454145c26ac913687086a0a62f2ae0bc10934a4030f',
    vout: 0,
    address: 'bchtest:qragvhtwjfqgcx7p96yv460m5myfv0qgfyfqdzqmra',
    scriptPubKey: '2103c9594cb2ebfebcb0cfd29eacd40ba012606a197beef76f0269ed8c101e56ceddac',
    amount: 50,
    confirmations: 104,
    spendable: true
  };

var utxo = {
    txid: '7f3b688cb224ed83e12d9454145c26ac913687086a0a62f2ae0bc10934a4030f',
    vout: 0,
    address: 'bchtest:qragvhtwjfqgcx7p96yv460m5myfv0qgfyfqdzqmra',
    scriptPubKey: '2103c9594cb2ebfebcb0cfd29eacd40ba012606a197beef76f0269ed8c101e56ceddac',
    amount: 50,
    confirmations: 104,
    spendable: true
  };

  var address = 'bitcoincash:qzjkz20ctwnftrzndnckf6q6wmks99cgggrcynphzz';
  var privateKey = PrivateKey.fromWIF('5JPdhSvKm9p4HheyWK2ZMYai5RfNeNcZhDCV1h1JhiDxqx8RrFc');
  var addressFromKey = Address.fromPrivateKey(privateKey, 'BCH');
  address.should.equal(addressFromKey.toString());

  var destKey = new PrivateKey();

  it('will correctly sign a publickey out transaction', function() {
    var tx = new Transaction();
  console.log(tx.inputs[0]);
    tx.from(utxo);
  console.log(tx.inputs[0]);
    tx.to(Address.fromPrivateKey(destKey), 10000);
  console.log(tx.inputs[0]);
  console.log(JSON.stringify(privateKey));
    tx.sign(privateKey);

  console.log('tx.inputs1 '+JSON.stringify(tx.inputs));
  console.log('tx.inputs2 '+JSON.stringify(tx.inputs[0].script));
  console.log('tx.inputs3 '+tx.inputs[0].script.length);
    tx.inputs[0].script.toBuffer().length.should.be.above(0);
  });

  it('count can count missing signatures', function() {
    var tx = new Transaction();
    tx.from(utxo);
    tx.to(Address.fromPrivateKey(destKey), 10000);
    var input = tx.inputs[0];
    input.isFullySigned().should.equal(false);
    tx.sign(privateKey);
    input.isFullySigned().should.equal(true);
  });

  it('it\'s size can be estimated', function() {
    var tx = new Transaction();
    tx.from(utxo);
    tx.to(Address.fromPrivateKey(destKey), 10000);
    var input = tx.inputs[0];
    input._estimateSize().should.equal(73);
  });

  it('it\'s signature can be removed', function() {
    var tx = new Transaction();
    tx.from(utxo);
    tx.to(Address.fromPrivateKey(destKey), 10000);
    var input = tx.inputs[0];
    tx.sign(privateKey);
    input.isFullySigned().should.equal(true);
    input.clearSignatures();
    input.isFullySigned().should.equal(false);
  });

  it('returns an empty array if private key mismatches', function() {
    var tx = new Transaction();
    tx.from(utxo);
    tx.to(Address.fromPrivateKey(destKey), 10000);
    var input = tx.inputs[0];
    var signatures = input.getSignatures(tx, new PrivateKey(), 0);
    signatures.length.should.equal(0);
  });

});
