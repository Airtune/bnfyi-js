import {
  SINGLE_ADDR_HEADER,
  MULTI_ADDR_HEADER
} from './constants';

export function matchSingleAddressHeader(address: string): boolean {
  return address.substr(0, SINGLE_ADDR_HEADER.length) == SINGLE_ADDR_HEADER;
}

export function matchMultiAddressHeader(address: string): boolean {
  return address.substr(0, MULTI_ADDR_HEADER.length) == MULTI_ADDR_HEADER;
}
