"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require('chai');
var bnfyi = require('../index');
var constants_1 = require("../constants");
var expect = chai.expect;
var expectedAddresses = [
    'ban_3foryourinfo143ceumofoj8cwi8njq8yx57osupkx5a63kqix5kemargraq',
    'ban_1rb1ejnq11111111111111111111111111111111111111111111roi6p8t7'
];
var object = {
    "number": 6,
    "note": "with extra dip"
};
describe('simple object encoding and decoding', function () {
    if (constants_1.MULTI_ADDR_HEADER == 'ban_3foryourinfo') {
        it('encodes simple object to expected addresses', function () {
            var objectEncodedInAddresses = bnfyi.encodeInAddresses(object);
            expect(expectedAddresses).to.deep.equal(objectEncodedInAddresses);
        });
    }
    it('encodes and decodes simple object without changing data', function () {
        var objectEncodedInAddresses = bnfyi.encodeInAddresses(object);
        var decodedObject = bnfyi.decodeFromAddresses(objectEncodedInAddresses);
        expect(decodedObject).to.deep.equal(object);
    });
});
//# sourceMappingURL=simple-object.spec.js.map