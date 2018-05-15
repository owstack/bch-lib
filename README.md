Bch Lib
=======

[![NPM Package](https://img.shields.io/npm/v/@owstack/bch-lib.svg?style=flat-square)](https://www.npmjs.org/package/@owstack/bch-lib)
[![Build Status](https://img.shields.io/travis/owstack/bch-lib.svg?branch=master&style=flat-square)](https://travis-ci.org/owstack/bch-lib)
[![Coverage Status](https://img.shields.io/coveralls/owstack/bch-lib.svg?style=flat-square)](https://coveralls.io/r/owstack/bch-lib)

A pure and powerful JavaScript Bitcoin Cash library.

## Attribution

This repository was created by copy forking [bitcore-lib 09b97ac](https://github.com/bitpay/bitcore-lib/commit/09b97ac96cf442a170f52d865ce77089b4f896f9).

## Principles

Bitcoin Cash is a powerful peer-to-peer platform for the next generation of financial technology. The decentralized nature of the Bitcoin Cash network allows for highly resilient bitcoin cash infrastructure, and the developer community needs reliable, open-source tools to implement bitcoin cash apps and services.

## Bitcoin Cash vs. Bitcoin

Bitcoin Cash uses an optional alternate address format called "cashaddr". It also has several additional changes to the script interpreter that allow the basics for smart contracts.

## Get Started

```
npm install @owstack/bch-lib
```

## Examples

* [Generate a random address](https://github.com/owstack/bch-lib/blob/master/docs/examples.md#generate-a-random-address)
* [Generate a address from a SHA256 hash](https://github.com/owstack/bch-lib/blob/master/docs/examples.md#generate-a-address-from-a-sha256-hash)
* [Import an address via WIF](https://github.com/owstack/bch-lib/blob/master/docs/examples.md#import-an-address-via-wif)
* [Create a Transaction](https://github.com/owstack/bch-lib/blob/master/docs/examples.md#create-a-transaction)
* [Sign a Bitcoin Cash message](https://github.com/owstack/bch-lib/blob/master/docs/examples.md#sign-a-bitcoin-cash-message)
* [Verify a Bitcoin Cash message](https://github.com/owstack/bch-lib/blob/master/docs/examples.md#verify-a-bitcoin-cash-message)
* [Create an OP RETURN transaction](https://github.com/owstack/bch-lib/blob/master/docs/examples.md#create-an-op-return-transaction)
* [Create a 2-of-3 multisig P2SH address](https://github.com/owstack/bch-lib/blob/master/docs/examples.md#create-a-2-of-3-multisig-p2sh-address)
* [Spend from a 2-of-2 multisig P2SH address](https://github.com/owstack/bch-lib/blob/master/docs/examples.md#spend-from-a-2-of-2-multisig-p2sh-address)


## Security

If you find a security issue, please email security@openwalletstack.com.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/owstack/bch-lib/blob/master/CONTRIBUTING.md) file.

## Building the Browser Bundle

To build a bch-lib full bundle for the browser:

```sh
gulp browser
```

This will generate files named `bch.js` and `bch.min.js`.

## Development & Tests

```sh
git clone https://github.com/owstack/bch-lib
cd bch-lib
npm install
```

Run all the tests:

```sh
gulp test
```

You can also run just the Node.js tests with `gulp test:node`, just the browser tests with `gulp test:browser`
or create a test coverage report (you can open `coverage/lcov-report/index.html` to visualize it) with `gulp coverage`.

## License

Code released under [the MIT license](https://github.com/owstack/bch-lib/blob/master/LICENSE).

Copyright 2017 Open Wallet Stack.
