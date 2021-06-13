"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeObjectInPublicKeys = exports.encodeInAddresses = void 0;
var msgpack_1 = require("@msgpack/msgpack");
var network_wrapper_1 = require("./network-wrapper");
var hexStringFromUint8Array_1 = require("./functions/hexStringFromUint8Array");
var constants_1 = require("./constants");
function encodeInAddresses(object) {
    var hexKeys = encodeObjectInPublicKeys(object);
    var addresses = hexKeys.map(network_wrapper_1.getAccount);
    return addresses;
}
exports.encodeInAddresses = encodeInAddresses;
function encodeObjectInPublicKeys(object) {
    var hex = encodeObjectInHex(object);
    return hexToPublicKeys(hex);
}
exports.encodeObjectInPublicKeys = encodeObjectInPublicKeys;
function encodeObjectInHex(object) {
    var objectHex = encodeObjectInHexNoHeader(object);
    var objectByteSize = Math.ceil(objectHex.length / 2.0);
    if (objectByteSize >= constants_1.SINGLE_MIN_BYTESIZE && objectByteSize <= constants_1.SINGLE_MAX_BYTESIZE) {
        return padHex(constants_1.SINGLE_HEX_HEADER + objectHex);
    }
    if (objectByteSize >= constants_1.MULTI_MIN_BYTESIZE && objectByteSize <= constants_1.MULTI_MAX_BYTESIZE) {
        var byteSize = constants_1.MULTI_HEADER_BYTESIZE + objectByteSize;
        // Default block count is 2 for multi block msgpacks.
        // 1 byte is used to add extra blocks up to 255 extra.
        var extraBlockCount = Math.ceil(byteSize / 32.0) - 2;
        if (extraBlockCount >= 0 && extraBlockCount <= 255) {
            var extraBlockCountHex = hexStringFromUint8Array_1.hexStringFromUint8Array(Uint8Array.from([extraBlockCount]));
            return padHex(constants_1.MULTI_HEX_HEADER + extraBlockCountHex + objectHex);
        }
        else {
            throw RangeError("Unexpected extraBlockCount out of range. Expected to be between 0 and 255, got: " + extraBlockCount);
        }
    }
    throw Error("Unexpected objectByteSize: " + objectByteSize);
}
;
function padHex(hex) {
    var paddedHexLength = Math.ceil(hex.length / 64.0) * 64;
    return hex.padEnd(paddedHexLength, "0");
}
function encodeObjectInHexNoHeader(object) {
    var objectBytes = msgpack_1.encode(object);
    var objectHexUnpadded = hexStringFromUint8Array_1.hexStringFromUint8Array(objectBytes);
    return objectHexUnpadded;
}
function hexToPublicKeys(hex) {
    var publicKeyCount = Math.ceil(hex.length / 64.0);
    var publicKeys = new Array(publicKeyCount);
    for (var i = 0; i < publicKeyCount; i++) {
        var publicKey = hex.slice(i * 64, (i + 1) * 64);
        publicKeys[i] = publicKey;
    }
    return publicKeys;
}
//# sourceMappingURL=encoder.js.map