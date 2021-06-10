const chai = require('chai');
const bnfyi = require('../index.js');
const constants = require('../app/constants');

const expect = chai.expect;

let expectedAddresses = [
  'ban_3foryourinfo143ceumofoj8cwi8njq8yx57osupkx5a63kqix5kemargraq',
  'ban_1rb1ejnq11111111111111111111111111111111111111111111roi6p8t7'
];

let object = {
  "number": 6,
  "note": "with extra dip"
};

describe('simple object encoding and decoding', () => {
  if (constants.MULTI_ADDR_HEADER == 'ban_3foryourinfo') {
    it('encodes simple object to expected addresses', () => {
      let objectEncodedInAddresses = bnfyi.encodeInAddresses(object);
      expect(expectedAddresses).to.deep.equal(objectEncodedInAddresses);
    });
  }

  it('encodes and decodes simple object without changing data', () => {
    let objectEncodedInAddresses = bnfyi.encodeInAddresses(object);
    let decodedObject = bnfyi.decodeFromAddresses(objectEncodedInAddresses);
    expect(decodedObject).to.deep.equal(object);
  });
});
