(function() {
  const mocha = require('mocha/mocha');

  mocha.setup('bdd');
  mocha.checkLeaks();

  require('./test/simple-object.spec');
  require('./test/small-object.spec');
  mocha.run();
})();
