"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexStringFromUint8Array = void 0;
//https://blog.xaymar.com/2020/12/08/fastest-uint8array-to-hex-string-conversion-in-javascript/
var LUT_HEX_4b = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
var LUT_HEX_8b = new Array(0x100);
for (var n = 0; n < 0x100; n++) {
    LUT_HEX_8b[n] = "" + LUT_HEX_4b[(n >>> 4) & 0xF] + LUT_HEX_4b[n & 0xF];
}
function hexStringFromUint8Array(buffer) {
    var out = '';
    for (var idx = 0, edx = buffer.length; idx < edx; idx++) {
        out += LUT_HEX_8b[buffer[idx]];
    }
    return out;
}
exports.hexStringFromUint8Array = hexStringFromUint8Array;
//# sourceMappingURL=hexStringFromUint8Array.js.map