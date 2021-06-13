import { encode as encodeMsgPack } from '@msgpack/msgpack';
import { getAccount } from './network-wrapper';
import { hexStringFromUint8Array } from './functions/hexStringFromUint8Array';
import {
  SINGLE_HEX_HEADER,
  SINGLE_MIN_BYTESIZE,
  SINGLE_MAX_BYTESIZE,
  MULTI_HEX_HEADER,
  MULTI_HEADER_BYTESIZE,
  MULTI_MIN_BYTESIZE,
  MULTI_MAX_BYTESIZE
} from './constants';

export function encodeInAddresses(object: any): string[] {
  let hexKeys: string[] = encodeObjectInPublicKeys(object);
  let addresses: string[] = hexKeys.map(getAccount);

  return addresses;
}

export function encodeObjectInPublicKeys(object: any): string[] {
  const hex: string = encodeObjectInHex(object);
  return hexToPublicKeys(hex);
}

function encodeObjectInHex(object: unknown): string {
  const objectHex: string = encodeObjectInHexNoHeader(object);
  const objectByteSize: number = Math.ceil(objectHex.length / 2.0);

  if (objectByteSize >= SINGLE_MIN_BYTESIZE && objectByteSize <= SINGLE_MAX_BYTESIZE) {
    return padHex(SINGLE_HEX_HEADER + objectHex);
  }
  
  if (objectByteSize >= MULTI_MIN_BYTESIZE && objectByteSize <= MULTI_MAX_BYTESIZE) {
    const byteSize: number = MULTI_HEADER_BYTESIZE + objectByteSize;
    // Default block count is 2 for multi block msgpacks.
    // 1 byte is used to add extra blocks up to 255 extra.
    const extraBlockCount: number = Math.ceil(byteSize / 32.0) - 2;
    if (extraBlockCount >= 0 && extraBlockCount <= 255) {
      const extraBlockCountHex: string = hexStringFromUint8Array(Uint8Array.from([extraBlockCount]));
      return padHex(
        MULTI_HEX_HEADER + extraBlockCountHex + objectHex
      );
    } else {
      throw RangeError(`Unexpected extraBlockCount out of range. Expected to be between 0 and 255, got: ${extraBlockCount}`);
    }
  }

  throw Error(`Unexpected objectByteSize: ${objectByteSize}`);
};

function padHex(hex: string): string {
  let paddedHexLength = Math.ceil(hex.length / 64.0) * 64;
  return hex.padEnd(paddedHexLength, "0");
}

function encodeObjectInHexNoHeader(object: unknown): string {
  let objectBytes: Uint8Array = encodeMsgPack(object);
  let objectHexUnpadded: string = hexStringFromUint8Array(objectBytes);
  return objectHexUnpadded;
}

function hexToPublicKeys(hex: string): string[] {
  let publicKeyCount: number = Math.ceil(hex.length / 64.0);

  let publicKeys: string[] = new Array(publicKeyCount);

  for (var i = 0; i < publicKeyCount; i++) {
    let publicKey: string = hex.slice(i*64, (i+1)*64);
    publicKeys[i] = publicKey;
  }

  return publicKeys;
}
