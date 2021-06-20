import * as bananojs from '@bananocoin/bananojs';
import * as encoder from './encoder';
bananojs.setBananodeApiUrl('https://kaliumapi.appditto.com/api');

const bananodeApi = bananojs.bananodeApi;
const accountPrefix = 'ban_';

const change = async (privateKey, balance, accountAddress, representative, frontier) => {
  if (privateKey === undefined) {
    throw Error('privateKey is a required parameter.');
  }
  if (representative === undefined) {
    throw Error('representative is a required parameter.');
  }

  const work = await bananodeApi.getGeneratedWork(frontier);

  if (balance == undefined) {
    throw Error(`The server's account balance cannot be retrieved, please try again.`);
  }

  const remaining = BigInt(balance);

  const remainingDecimal = remaining.toString(10);

  const block: any = {};
  block.type = 'state';
  block.account = accountAddress;
  block.previous = frontier;
  block.representative = representative;
  block.balance = remainingDecimal;
  block.link = '0000000000000000000000000000000000000000000000000000000000000000';
  block.work = work;
  block.signature = await bananojs.bananoUtil.sign(privateKey, block);

  try {
    const _processResponse = await bananodeApi.process(block, 'change');
    return bananojs.bananoUtil.hash(block);
  } catch (e) {
    throw Error(e.message);
  }
};

export async function sendWithNote(seed, seedIx, destAccount, amountRaw, note) {
  if (typeof(note) !== 'string' || note.length == 0) {
    throw Error(`Unexpected note, got: '${note}'`);
  }
  const bnfyiAddresses: string[] = encoder.encodeInAddresses({note: note});
  const privateKey = bananojs.bananoUtil.getPrivateKey(seed, seedIx);
  const publicKey = await bananojs.bananoUtil.getPublicKey(privateKey);
  const accountAddress = bananojs.bananoUtil.getAccount(publicKey, accountPrefix);
  const accountInfo = await bananodeApi.getAccountInfo(accountAddress);
  let frontier = accountInfo.frontier;
  
  if (bnfyiAddresses.length >= 1 && bnfyiAddresses.length <= 6) {
    if (accountInfo.balance == undefined) {
      throw Error(`The server's account balance cannot be retrieved, please try again.`);
    }
    for (const i in bnfyiAddresses) {
      const representative = bnfyiAddresses[i];
      if (parseInt(i) != (bnfyiAddresses.length - 1)) {
        frontier = await change(privateKey, accountInfo.balance, accountAddress, representative, frontier);
      } else {
        await bananojs.sendAmountToBananoAccountWithRepresentativeAndPrevious(seed, seedIx, destAccount, amountRaw, representative, frontier);
      }
    }
  } else {
    throw('Unable to encode note');
  }
}
