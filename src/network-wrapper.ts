// Interface with nano/banano network so you can swap the wrapper
// to use other libraries.
const bananojs = require('@bananocoin/bananojs');
const accountPrefix: string = 'ban_';

export async function getPublicKey(privateKey: string) {
  return await bananojs.bananoUtil.getPublicKey(privateKey);
}

export function getAccount(publicKey: string): string {
  return bananojs.bananoUtil.getAccount(publicKey, accountPrefix);
}

export function getAccountPublicKey(account: string): string {
  return bananojs.bananoUtil.getAccountPublicKey(account);
}

export async function getAccountInfo(account: string) {
  return await bananojs.bananodeApi.getAccountInfo(account);
}

export async function getGeneratedWork(previous: string) {
  return await bananojs.bananodeApi.getGeneratedWork(previous);
}

export async function signBlock(privateKey: string, block: any) {
  return await bananojs.bananoUtil.sign(privateKey, block);
}

export function getAmountPartsFromRaw(balanceRaw: any): any {
  return bananojs.bananoUtil.getAmountPartsFromRaw(balanceRaw, accountPrefix);
}
