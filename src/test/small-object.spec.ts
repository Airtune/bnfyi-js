const chai = require('chai');
const bnfyi = require('../index');
import { SINGLE_ADDR_HEADER } from '../constants';

const expect = chai.expect;

const expectedAddresses = [
  'ban_1foryourinfoi8k8wuunepq9gsdg63r8ysdf63j96sd3ei1111117dfm1e5s'
];

const object = {
  "note": "wen poem bread"
};

describe('small object encoding and decoding', () => {
  if (SINGLE_ADDR_HEADER == 'ban_1foryourinfo') {
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
