const encoder = require('./encoder');
const decoder = require('./decoder');
const detector = require('./detector');

module.exports = {
  encodeInAddresses: encoder.encodeInAddresses,
  decodeFromAddresses: decoder.decodeFromAddresses,
  decodeFromSend: detector.decodeFromSend,
  decodeFromReceive: detector.decodeFromReceive
};
