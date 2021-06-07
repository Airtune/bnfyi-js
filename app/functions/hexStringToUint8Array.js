module.exports = (hexString) => {
  const bytes = new Uint8Array(Math.ceil(hexString.length / 2.0));

  for (var i = 0; i < bytes.length; i++) {
    const hexPair = hexString.substr(i*2, 2);
    bytes[i] = parseInt(hexPair, 16);
  }
  
  return bytes;
}
