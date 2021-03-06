export function hexStringToUint8Array(hexString: string): Uint8Array {
  const bytes: Uint8Array = new Uint8Array(Math.ceil(hexString.length / 2.0));

  for (var i = 0; i < bytes.length; i++) {
    const hexPair: string = hexString.substr(i*2, 2);
    bytes[i] = parseInt(hexPair, 16);
  }
  
  return bytes;
}
