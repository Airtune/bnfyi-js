const encoder = require('./encoder');
const decoder = require('./decoder');
const detector = require('./detector');
const sender = require('./sender');

module.exports = {
  encodeInAddresses: encoder.encodeInAddresses,
  decodeFromAddresses: decoder.decodeFromAddresses,
  decodeFromSend: detector.decodeFromSend,
  decodeFromReceive: detector.decodeFromReceive,
  sendWithNote: sender.sendWithNote
};
