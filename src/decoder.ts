import { getAccountPublicKey } from './network-wrapper';
// Use decodeMulti to ignore 0 padding at the end of public key.
import { decodeMulti as decodeMultiMsgPack } from '@msgpack/msgpack';

import { hexStringToUint8Array } from './functions/hexStringToUint8Array';
import { matchSingleAddressHeader, matchMultiAddressHeader} from './detector';

import {
  SINGLE_HEX_START,
  SINGLE_HEX_END,
  MULTI_HEX_START,
  MULTI_HEX_END,
  MULTI_HEX_COUNT_START,
  MULTI_HEX_COUNT_END
} from './constants';

export function decodeFromAddresses(addresses: string[]): any {
  const address = addresses[0];
  
  if (matchSingleAddressHeader(address)) {
    return decodeFromSingleHeaderAddress(address);
  } else if (matchMultiAddressHeader(address)) {
    return decodeFromMultiHeaderAddresses(addresses);
  } else {
    throw Error(`unexpected address: ${address}`);
  }
}

export function decodeFromSingleHeaderAddress(address: string): any {
  let hexObject = singleHeaderAddressToHex(address);
  return decodeObjectFromHex(hexObject);
}

export function decodeFromMultiHeaderAddresses(addresses: string[]): any {
  let hexObject = multiHeaderAddressesToHex(addresses);
  return decodeObjectFromHex(hexObject);
}

function singleHeaderAddressToHex(address: string): string {
  const publicKey = getAccountPublicKey(address);
  return publicKey.substring(SINGLE_HEX_START, SINGLE_HEX_END);
}

function multiHeaderAddressesToHex(addresses: string[]): string {
  let hex: string = "";
  const headerAddress: string = addresses[0];
  const headerPublicKey: string = getAccountPublicKey(headerAddress);

  const extraCountHex = headerPublicKey.substring(MULTI_HEX_COUNT_START, MULTI_HEX_COUNT_END);
  const extraCount = hexStringToUint8Array(extraCountHex)[0];
  const fyiAddressCount = 2 + extraCount;

  if (addresses.length < fyiAddressCount) {
    throw Error(`Didn't get enough addresses in multiHeaderAddressesToHex. Header specify a total of ${fyiAddressCount} addresses, got: ${addresses.length}`);
  }

  hex += headerPublicKey.substring(MULTI_HEX_START, MULTI_HEX_END);

  for (var i = 1; i < fyiAddressCount; i++) {
    var mAddress = addresses[i];
    var publicKey = getAccountPublicKey(mAddress);
    hex += publicKey;
  }

  return hex;
}

export function decodeObjectFromHex(objectHex: string): any {
  let operationBytes = hexStringToUint8Array(objectHex);
  let operation = decodeMultiMsgPack(operationBytes).next().value;

  return operation;
}
