const encoder = require('./encoder');
const decoder = require('./decoder');

module.exports = {
  encodeInAddresses: encoder.encodeInAddresses,
  decodeFromAddresses: decoder.decodeFromAddresses
};
