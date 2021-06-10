const chai = require('chai');
const bnfyi = require('../index.js');
const constants = require('../app/constants');

const expect = chai.expect;

let expectedAddresses = [
  'ban_1foryourinfoi8k8wuunepq9gsdg63r8ysdf63j96sd3fe111111k9d9eczs'
];

let object = {
  "note": "wen poem break"
};

describe('small object encoding and decoding', () => {
  if (constants.SINGLE_ADDR_HEADER == 'ban_1foryourinfo') {
    it('encodes small object to expected address', () => {
      let objectEncodedInAddresses = bnfyi.encodeInAddresses(object);
      expect(expectedAddresses).to.deep.equal(objectEncodedInAddresses);
    });
  }

  it('encodes and decodes small object without changing data', () => {
    let objectEncodedInAddresses = bnfyi.encodeInAddresses(object);
    let decodedObject = bnfyi.decodeFromAddresses(objectEncodedInAddresses);
    expect(decodedObject).to.deep.equal(object);
  });
});
