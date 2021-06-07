const bananojs = require('@bananocoin/bananojs');
const msgpack = require('@msgpack/msgpack');
const hexStringToUint8Array = require('./functions/hexStringToUint8Array');
const constants = require('./constants');

const decodeMultiMsgPack = msgpack.decodeMulti;

const SINGLE_ADDR_HEADER        = constants.SINGLE_ADDR_HEADER;
const SINGLE_HEX_HEADER         = constants.SINGLE_HEX_HEADER;

const SINGLE_ADDR_HEADER_LENGTH = SINGLE_ADDR_HEADER.length;
const SINGLE_HEX_START          = SINGLE_HEX_HEADER.length;
const SINGLE_HEX_END            = 64;

const MULTI_ADDR_HEADER         = constants.MULTI_ADDR_HEADER;
const MULTI_HEX_HEADER          = constants.MULTI_HEX_HEADER;
const MULTI_HEX_COUNT_START     = constants.MULTI_HEX_COUNT_START;
const MULTI_HEX_COUNT_END       = constants.MULTI_HEX_COUNT_END;

const MULTI_ADDR_HEADER_LENGTH  = MULTI_ADDR_HEADER.length;
const MULTI_HEX_START           = MULTI_HEX_HEADER.length + 2;
const MULTI_HEX_END             = 64;

decodeObjectFromAddresses = (addresses) => {
  let hexObject;
  const address = addresses[0];

  if (address.substr(0, SINGLE_ADDR_HEADER_LENGTH) == SINGLE_ADDR_HEADER) {
    hexObject = singleHeaderAddressToHex(address);
  } else if (address.substr(0, MULTI_ADDR_HEADER_LENGTH) == MULTI_ADDR_HEADER) {
    hexObject = multiHeaderAddressesToHex(addresses);
  } else {
    throw `unexpected address: ${address}`;
  }

  return decodeObjectFromHex(hexObject);
}

singleHeaderAddressToHex = (address) => {
  const publicKey = bananojs.getAccountPublicKey(address);
  return publicKey.substring(SINGLE_HEX_START, SINGLE_HEX_END);
}

multiHeaderAddressesToHex = (addresses) =>{
  let hex = "";
  const headerAddress = addresses[0];
  const header = headerAddress.substr(0, MULTI_ADDR_HEADER_LENGTH);
  
  if (header != MULTI_ADDR_HEADER) {
    throw `Unexpected header. Expected '${MULTI_ADDR_HEADER}', got: '${headerAddress}'`;
  }

  const headerPublicKey = bananojs.getAccountPublicKey(headerAddress);

  const extraCountHex = headerPublicKey.substring(MULTI_HEX_COUNT_START, MULTI_HEX_COUNT_END);
  const extraCount = hexStringToUint8Array(extraCountHex)[0];
  const fyiAddressCount = 2 + extraCount;

  if (addresses.length < fyiAddressCount) {
    throw `Didn't get enough addresses in multiHeaderAddressesToHex. Header specify a total of ${fyiAddressCount} addresses, got: ${addresses.length}`;
  }

  hex += headerPublicKey.substring(MULTI_HEX_START, MULTI_HEX_END);

  for (var i = 1; i < fyiAddressCount; i++) {
    var mAddress = addresses[i];
    var publicKey = bananojs.getAccountPublicKey(mAddress);
    hex += publicKey;
  }

  return hex;
}

decodeObjectFromHex = (objectHex) => {
  let operationBytes = hexStringToUint8Array(objectHex);
  let operation = decodeMultiMsgPack(operationBytes).next().value;

  return operation;
}

module.exports = {
  decodeObjectFromAddresses: decodeObjectFromAddresses,
  decodeObjectFromHex: decodeObjectFromHex
}
