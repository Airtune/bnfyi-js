"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeObjectFromHex = exports.decodeFromMultiHeaderAddresses = exports.decodeFromSingleHeaderAddress = exports.decodeFromAddresses = void 0;
var network_wrapper_1 = require("./network-wrapper");
// Use decodeMulti to ignore 0 padding at the end of public key.
var msgpack_1 = require("@msgpack/msgpack");
var hexStringToUint8Array_1 = require("./functions/hexStringToUint8Array");
var detector_1 = require("./detector");
var constants_1 = require("./constants");
function decodeFromAddresses(addresses) {
    var address = addresses[0];
    if (detector_1.matchSingleAddressHeader(address)) {
        return decodeFromSingleHeaderAddress(address);
    }
    else if (detector_1.matchMultiAddressHeader(address)) {
        return decodeFromMultiHeaderAddresses(addresses);
    }
    else {
        throw Error("unexpected address: " + address);
    }
}
exports.decodeFromAddresses = decodeFromAddresses;
function decodeFromSingleHeaderAddress(address) {
    var hexObject = singleHeaderAddressToHex(address);
    return decodeObjectFromHex(hexObject);
}
exports.decodeFromSingleHeaderAddress = decodeFromSingleHeaderAddress;
function decodeFromMultiHeaderAddresses(addresses) {
    var hexObject = multiHeaderAddressesToHex(addresses);
    return decodeObjectFromHex(hexObject);
}
exports.decodeFromMultiHeaderAddresses = decodeFromMultiHeaderAddresses;
function singleHeaderAddressToHex(address) {
    var publicKey = network_wrapper_1.getAccountPublicKey(address);
    return publicKey.substring(constants_1.SINGLE_HEX_START, constants_1.SINGLE_HEX_END);
}
function multiHeaderAddressesToHex(addresses) {
    var hex = "";
    var headerAddress = addresses[0];
    var headerPublicKey = network_wrapper_1.getAccountPublicKey(headerAddress);
    var extraCountHex = headerPublicKey.substring(constants_1.MULTI_HEX_COUNT_START, constants_1.MULTI_HEX_COUNT_END);
    var extraCount = hexStringToUint8Array_1.hexStringToUint8Array(extraCountHex)[0];
    var fyiAddressCount = 2 + extraCount;
    if (addresses.length < fyiAddressCount) {
        throw Error("Didn't get enough addresses in multiHeaderAddressesToHex. Header specify a total of " + fyiAddressCount + " addresses, got: " + addresses.length);
    }
    hex += headerPublicKey.substring(constants_1.MULTI_HEX_START, constants_1.MULTI_HEX_END);
    for (var i = 1; i < fyiAddressCount; i++) {
        var mAddress = addresses[i];
        var publicKey = network_wrapper_1.getAccountPublicKey(mAddress);
        hex += publicKey;
    }
    return hex;
}
function decodeObjectFromHex(objectHex) {
    var operationBytes = hexStringToUint8Array_1.hexStringToUint8Array(objectHex);
    var operation = msgpack_1.decodeMulti(operationBytes).next().value;
    return operation;
}
exports.decodeObjectFromHex = decodeObjectFromHex;
//# sourceMappingURL=decoder.js.map