"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require('chai');
var bnfyi = require('../index');
var constants_1 = require("../constants");
var expect = chai.expect;
var expectedAddresses = [
    'ban_1foryourinfoi8k8wuunepq9gsdg63r8ysdf63j96sd3ei1111117dfm1e5s'
];
var object = {
    "note": "wen poem bread"
};
describe('small object encoding and decoding', function () {
    if (constants_1.SINGLE_ADDR_HEADER == 'ban_1foryourinfo') {
        it('encodes small object to expected address', function () {
            var objectEncodedInAddresses = bnfyi.encodeInAddresses(object);
            expect(expectedAddresses).to.deep.equal(objectEncodedInAddresses);
        });
    }
    it('encodes and decodes small object without changing data', function () {
        var objectEncodedInAddresses = bnfyi.encodeInAddresses(object);
        var decodedObject = bnfyi.decodeFromAddresses(objectEncodedInAddresses);
        expect(decodedObject).to.deep.equal(object);
    });
});
//# sourceMappingURL=small-object.spec.js.map