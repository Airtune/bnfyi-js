"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchMultiAddressHeader = exports.matchSingleAddressHeader = void 0;
var constants_1 = require("./constants");
function matchSingleAddressHeader(address) {
    return address.substr(0, constants_1.SINGLE_ADDR_HEADER.length) == constants_1.SINGLE_ADDR_HEADER;
}
exports.matchSingleAddressHeader = matchSingleAddressHeader;
function matchMultiAddressHeader(address) {
    return address.substr(0, constants_1.MULTI_ADDR_HEADER.length) == constants_1.MULTI_ADDR_HEADER;
}
exports.matchMultiAddressHeader = matchMultiAddressHeader;
//# sourceMappingURL=detector.js.map