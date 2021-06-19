var encoder = require('./encoder');
var decoder = require('./decoder');
var detector = require('./detector');
module.exports = {
    encodeInAddresses: encoder.encodeInAddresses,
    decodeFromAddresses: decoder.decodeFromAddresses,
    decodeFromSend: detector.decodeFromSend,
    decodeFromReceive: detector.decodeFromReceive
};
//# sourceMappingURL=index.js.map