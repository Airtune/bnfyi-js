"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexStringToUint8Array = void 0;
function hexStringToUint8Array(hexString) {
    var bytes = new Uint8Array(Math.ceil(hexString.length / 2.0));
    for (var i = 0; i < bytes.length; i++) {
        var hexPair = hexString.substr(i * 2, 2);
        bytes[i] = parseInt(hexPair, 16);
    }
    return bytes;
}
exports.hexStringToUint8Array = hexStringToUint8Array;
//# sourceMappingURL=hexStringToUint8Array.js.map