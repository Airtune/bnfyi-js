import * as bananojs from '@bananocoin/bananojs';
import {
  SINGLE_ADDR_HEADER,
  MULTI_ADDR_HEADER
} from './constants';
import * as decoder from './decoder';

export function matchSingleAddressHeader(address: string): boolean {
  return address.substr(0, SINGLE_ADDR_HEADER.length) == SINGLE_ADDR_HEADER;
}

export function matchMultiAddressHeader(address: string): boolean {
  return address.substr(0, MULTI_ADDR_HEADER.length) == MULTI_ADDR_HEADER;
}

export async function decodeFromSend(sendingAccount:string, blockHash: string, lookbackBlockHeight: number = 257) {
  const accountHistory = await bananojs.getAccountHistory(sendingAccount, lookbackBlockHeight, blockHash, true);

  return decodeFromAccountHistory(accountHistory, blockHash);
}

export async function decodeFromReceive(receiveLink: string, lookbackBlockHeight: number = 257) {
  const blocks = bananojs.bananodeApi.getBlocks([receiveLink], "true");
  const sendBlock = blocks[receiveLink];
  const accountHistory = await bananojs.getAccountHistory(sendBlock.account, lookbackBlockHeight, receiveLink, true);

  return decodeFromAccountHistory(accountHistory, receiveLink);
}

function decodeFromAccountHistory(accountHistory: any, blockHash: string): any {
  for (const i in accountHistory.history) {
    const line = accountHistory.history[i];
    if (line.hash != blockHash && line.subtype !== 'change') {
      break;
    }

    const address: string = line.representative;

    if (matchSingleAddressHeader(address)) {
      return decoder.decodeFromSingleHeaderAddress(address);
    } else if (matchMultiAddressHeader(address)) {
      const addresses = accountHistory.history.slice(i).reverse().map((block: any) => { block.representative })
      return decoder.decodeFromMultiHeaderAddresses(addresses);
    }
  }

  return false;
}
