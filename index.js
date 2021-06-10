const encoder = require('./app/encoder');
const decoder = require('./app/decoder');

module.exports = {
  encodeInAddresses: encoder.encodeInAddresses,
  decodeFromAddresses: decoder.decodeFromAddresses
};
