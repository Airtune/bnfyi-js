// TODO: Automatically generate headers from vanities like: 'foryourinfo'.
// Header used for single block msgpacks
export const SINGLE_ADDR_HEADER: string = 'ban_1foryourinfo';
export const SINGLE_HEX_HEADER: string  = '36B8F5778851B5';

// Header used for multi block msgpacks.
export const MULTI_ADDR_HEADER: string = 'ban_3foryourinfo';
export const MULTI_HEX_HEADER: string  = 'B6B8F5778851B5';

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

export const SINGLE_HEADER_BYTESIZE: number = Math.ceil(SINGLE_HEX_HEADER.length / 2.0);
export const SINGLE_MIN_BYTESIZE: number = 1;
export const SINGLE_MAX_BYTESIZE: number = 32 - SINGLE_HEADER_BYTESIZE;

// Up to 255 extra + 2 default addresses of storage.
export const MULTI_MAX_ADDRESSES: number = 255 + 2;
// + 1 byte to store the count of extra addresses.
export const MULTI_HEADER_BYTESIZE: number = Math.ceil(MULTI_HEX_HEADER.length / 2.0) + 1;
export const MULTI_MIN_BYTESIZE: number = Math.max(1+SINGLE_MAX_BYTESIZE, 32-MULTI_HEADER_BYTESIZE);
export const MULTI_MAX_BYTESIZE: number = (MULTI_MAX_ADDRESSES * 32) - MULTI_HEADER_BYTESIZE;

export const MULTI_HEX_COUNT_START: number = MULTI_HEX_HEADER.length;
export const MULTI_HEX_COUNT_END: number = MULTI_HEX_COUNT_START + 2;

export const SINGLE_HEX_START: number = SINGLE_HEX_HEADER.length;
export const SINGLE_HEX_END: number = 64;
export const MULTI_HEX_START: number = MULTI_HEX_HEADER.length + 2;
export const MULTI_HEX_END: number = 64;

if (SINGLE_HEADER_BYTESIZE > 31) {
  throw RangeError(`SINGLE_HEX_HEADER header can't be larger than 31 bytes, got size: ${SINGLE_HEADER_BYTESIZE}`);
}

if (SINGLE_HEADER_BYTESIZE < 3) {
  throw RangeError(`SINGLE_HEADER_BYTESIZE too small (< 3), got size: ${SINGLE_HEADER_BYTESIZE}`);
}

if (MULTI_HEADER_BYTESIZE > 32) {
  throw RangeError(`MULTI_HEADER_BYTESIZE can't be larger than 32 bytes, got size: ${MULTI_HEADER_BYTESIZE}`);
}

if (MULTI_HEADER_BYTESIZE < 4) {
  throw RangeError(`MULTI_HEADER_BYTESIZE too small (< 4), got size: ${MULTI_HEADER_BYTESIZE}`);
}
