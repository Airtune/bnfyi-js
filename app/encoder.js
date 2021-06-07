const bananojs = require('@bananocoin/bananojs');
const msgpack = require('@msgpack/msgpack');
const hexStringFromUint8Array = require('./functions/hexStringFromUint8Array');
const constants = require('./constants');

const encodeMsgPack = msgpack.encode;
const SINGLE_HEX_HEADER = constants.SINGLE_HEX_HEADER;
const SINGLE_MIN_BYTESIZE = constants.SINGLE_MIN_BYTESIZE;
const SINGLE_MAX_BYTESIZE = constants.SINGLE_MAX_BYTESIZE;
const MULTI_HEX_HEADER = constants.MULTI_HEX_HEADER;
const MULTI_HEADER_BYTESIZE = constants.MULTI_HEADER_BYTESIZE;
const MULTI_MIN_BYTESIZE = constants.MULTI_MIN_BYTESIZE;
const MULTI_MAX_BYTESIZE = constants.MULTI_MAX_BYTESIZE;

const encodeObjectInAddresses = (object) => {
  let hexKeys = encodeObjectInPublicKeys(object);
  let addresses = hexKeys.map(bananojs.getBananoAccount);

  return addresses;
}

const encodeObjectInPublicKeys = (object) => {
  const hex = encodeObjectInHex(object);
  return hexToPublicKeys(hex);
}

const encodeObjectInHex = (object) => {
  const objectHex = encodeObjectInHexNoHeader(object);
  const objectByteSize = Math.ceil(objectHex.length / 2.0);

  if (typeof(objectByteSize) != "number") {
    throw `Unexpected objectByteSize type. Expected type "number", got: ${typeof(objectByteSize)}`;
  }

  if (objectByteSize >= SINGLE_MIN_BYTESIZE && objectByteSize <= SINGLE_MAX_BYTESIZE) {
    return padHex(SINGLE_HEX_HEADER + objectHex);
  }
  
  if (objectByteSize >= MULTI_MIN_BYTESIZE && objectByteSize <= MULTI_MAX_BYTESIZE) {
    const byteSize = MULTI_HEADER_BYTESIZE + objectByteSize;
    // Default block count is 2 for multi block msgpacks.
    // 1 byte is used to add extra blocks up to 255 extra.
    const extraBlockCount = Math.ceil(byteSize / 32.0) - 2;
    if (extraBlockCount >= 0 && extraBlockCount <= 255) {
      const extraBlockCountHex = hexStringFromUint8Array([extraBlockCount]);
      return padHex(
        MULTI_HEX_HEADER + extraBlockCountHex + objectHex
      );
    } else {
      throw `Unexpected extraBlockCount out of range. Expected to be between 0 and 255, got: ${extraBlockCount}`;
    }
  }

  throw `Unexpected objectByteSize: ${objectByteSize}`;
};

const padHex = (hex) => {
  let paddedHexLength = Math.ceil(hex.length / 64.0) * 64;
  return hex.padEnd(paddedHexLength, "0");
}

const encodeObjectInHexNoHeader = (object) => {
  let objectBytes = encodeMsgPack(object);
  let objectHexUnpadded = hexStringFromUint8Array(objectBytes);
  return objectHexUnpadded;
}

const hexToPublicKeys = (hex) => {
  let publicKeyCount = Math.ceil(hex.length / 64.0);

  let publicKeys = new Array(publicKeyCount);

  for (var i = 0; i < publicKeyCount; i++) {
    let publicKey = hex.slice(i*64, (i+1)*64);
    publicKeys[i] = publicKey;
  }

  return publicKeys;
}

module.exports = {
  encodeObjectInAddresses: encodeObjectInAddresses,
  encodeObjectInPublicKeys: encodeObjectInPublicKeys
};
