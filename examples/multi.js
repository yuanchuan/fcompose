var compose = require('../');

compose({
    input: 'multi.js'
  , output: ['result/mma.js', 'result/mmb.js']
  , processor: function(buffer, next) {
      var content = buffer.toString();
      next(
        content,
        '\n\n/*---------------------------*/\n\n',
        content
      )
    }
});
