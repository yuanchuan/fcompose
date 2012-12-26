var compose = require('../');

compose({
    input: 'multi.js'
  , output: ['result/mma.js', 'result/mmb.js']
  , processor: function(content, next) {
      next(
        content, 
        '\n\n---------------------------\n\n',
        content
      )
    }
});
