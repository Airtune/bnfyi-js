// TODO: Automatically generate headers from vanity: 'foryourinfo'.
// Header used for single block msgpacks
const SINGLE_ADDR_HEADER = 'ban_1foryourinfo';
const SINGLE_HEX_HEADER  = '36B8F5778851B5';

// Header used for multi block msgpacks.
const MULTI_ADDR_HEADER = 'ban_3foryourinfo';
const MULTI_HEX_HEADER  = 'B6B8F5778851B5';

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

const SINGLE_HEADER_BYTESIZE = Math.ceil(SINGLE_HEX_HEADER.length / 2.0);
const SINGLE_MIN_BYTESIZE = 1;
const SINGLE_MAX_BYTESIZE = 32 - SINGLE_HEADER_BYTESIZE;

// Up to 255 extra + 2 default addresses of storage.
const MULTI_MAX_ADDRESSES = 255 + 2;
// + 1 byte to store the count of extra addresses.
const MULTI_HEADER_BYTESIZE = Math.ceil(MULTI_HEX_HEADER.length / 2.0) + 1;
const MULTI_MIN_BYTESIZE = Math.max(1+SINGLE_MAX_BYTESIZE, 32-MULTI_HEADER_BYTESIZE);
const MULTI_MAX_BYTESIZE = (MULTI_MAX_ADDRESSES * 32) - MULTI_HEADER_BYTESIZE;

const MULTI_HEX_COUNT_START = MULTI_HEX_HEADER.length;
const MULTI_HEX_COUNT_END   = MULTI_HEX_COUNT_START + 2;

if (SINGLE_HEADER_BYTESIZE > 31) {
  throw `SINGLE_HEX_HEADER header can't be larger than 31 bytes, got size: ${SINGLE_HEADER_BYTESIZE}`;
}

if (SINGLE_HEADER_BYTESIZE < 3) {
  throw `SINGLE_HEADER_BYTESIZE too small (< 3), got size: ${SINGLE_HEADER_BYTESIZE}`;
}

if (MULTI_HEADER_BYTESIZE > 32) {
  throw `MULTI_HEADER_BYTESIZE can't be larger than 32 bytes, got size: ${MULTIMULTI_HEADER_BYTESIZE_HEADER_BYTESIZE}`;
}

if (MULTI_HEADER_BYTESIZE < 4) {
  throw `MULTI_HEADER_BYTESIZE too small (< 4), got size: ${MULTI_HEADER_BYTESIZE}`;
}

module.exports = {
  SINGLE_ADDR_HEADER:     SINGLE_ADDR_HEADER,
  SINGLE_HEX_HEADER:      SINGLE_HEX_HEADER,
  SINGLE_HEADER_BYTESIZE: SINGLE_HEADER_BYTESIZE,
  SINGLE_MIN_BYTESIZE:    SINGLE_MIN_BYTESIZE,
  SINGLE_MAX_BYTESIZE:    SINGLE_MAX_BYTESIZE,
  MULTI_ADDR_HEADER:      MULTI_ADDR_HEADER,
  MULTI_HEX_HEADER:       MULTI_HEX_HEADER,
  MULTI_HEADER_BYTESIZE:  MULTI_HEADER_BYTESIZE,
  MULTI_MIN_BYTESIZE:     MULTI_MIN_BYTESIZE,
  MULTI_MAX_BYTESIZE:     MULTI_MAX_BYTESIZE,
  MULTI_HEX_COUNT_START:  MULTI_HEX_COUNT_START,
  MULTI_HEX_COUNT_END:    MULTI_HEX_COUNT_END
}