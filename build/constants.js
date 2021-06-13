"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MULTI_HEX_END = exports.MULTI_HEX_START = exports.SINGLE_HEX_END = exports.SINGLE_HEX_START = exports.MULTI_HEX_COUNT_END = exports.MULTI_HEX_COUNT_START = exports.MULTI_MAX_BYTESIZE = exports.MULTI_MIN_BYTESIZE = exports.MULTI_HEADER_BYTESIZE = exports.MULTI_MAX_ADDRESSES = exports.SINGLE_MAX_BYTESIZE = exports.SINGLE_MIN_BYTESIZE = exports.SINGLE_HEADER_BYTESIZE = exports.MULTI_HEX_HEADER = exports.MULTI_ADDR_HEADER = exports.SINGLE_HEX_HEADER = exports.SINGLE_ADDR_HEADER = void 0;
// TODO: Automatically generate headers from vanities like: 'foryourinfo'.
// Header used for single block msgpacks
exports.SINGLE_ADDR_HEADER = 'ban_1foryourinfo';
exports.SINGLE_HEX_HEADER = '36B8F5778851B5';
// Header used for multi block msgpacks.
exports.MULTI_ADDR_HEADER = 'ban_3foryourinfo';
exports.MULTI_HEX_HEADER = 'B6B8F5778851B5';
// If you want to fork the project and generate a new vanity header instead of 'foryourinfo',
// generate the address header here:
// https://nanoo.tools/vanity-burn
// Use 1 as a leading number for single address data.
// Use 3 as a leading number for data encoded in multiple addresses.
// Keep SINGLE_ADDR_HEADER and MULTI_ADDR_HEADER same length.
//
// Enter both addresses in the link below and copy paste each public key up until the zeros as the hex header.
// The hex length must be even, e.g. 12, 14 and not 11, 13.
// https://tools.nanos.cc/?tool=seed
// Run `npm test` to make sure everything is set up correctly.
exports.SINGLE_HEADER_BYTESIZE = Math.ceil(exports.SINGLE_HEX_HEADER.length / 2.0);
exports.SINGLE_MIN_BYTESIZE = 1;
exports.SINGLE_MAX_BYTESIZE = 32 - exports.SINGLE_HEADER_BYTESIZE;
// Up to 255 extra + 2 default addresses of storage.
exports.MULTI_MAX_ADDRESSES = 255 + 2;
// + 1 byte to store the count of extra addresses.
exports.MULTI_HEADER_BYTESIZE = Math.ceil(exports.MULTI_HEX_HEADER.length / 2.0) + 1;
exports.MULTI_MIN_BYTESIZE = Math.max(1 + exports.SINGLE_MAX_BYTESIZE, 32 - exports.MULTI_HEADER_BYTESIZE);
exports.MULTI_MAX_BYTESIZE = (exports.MULTI_MAX_ADDRESSES * 32) - exports.MULTI_HEADER_BYTESIZE;
exports.MULTI_HEX_COUNT_START = exports.MULTI_HEX_HEADER.length;
exports.MULTI_HEX_COUNT_END = exports.MULTI_HEX_COUNT_START + 2;
exports.SINGLE_HEX_START = exports.SINGLE_HEX_HEADER.length;
exports.SINGLE_HEX_END = 64;
exports.MULTI_HEX_START = exports.MULTI_HEX_HEADER.length + 2;
exports.MULTI_HEX_END = 64;
if (exports.SINGLE_HEADER_BYTESIZE > 31) {
    throw RangeError("SINGLE_HEX_HEADER header can't be larger than 31 bytes, got size: " + exports.SINGLE_HEADER_BYTESIZE);
}
if (exports.SINGLE_HEADER_BYTESIZE < 3) {
    throw RangeError("SINGLE_HEADER_BYTESIZE too small (< 3), got size: " + exports.SINGLE_HEADER_BYTESIZE);
}
if (exports.MULTI_HEADER_BYTESIZE > 32) {
    throw RangeError("MULTI_HEADER_BYTESIZE can't be larger than 32 bytes, got size: " + exports.MULTI_HEADER_BYTESIZE);
}
if (exports.MULTI_HEADER_BYTESIZE < 4) {
    throw RangeError("MULTI_HEADER_BYTESIZE too small (< 4), got size: " + exports.MULTI_HEADER_BYTESIZE);
}
//# sourceMappingURL=constants.js.map