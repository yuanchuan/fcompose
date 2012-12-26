var compose = require('../')

compose({
    input:  ['packer.js', 'multi.js']
  , output: 'result/packer_all.js'
  , processor: function(content, next) {
      next(
        content
          .replace(/^\s*/g, '')
          .replace(/\n*/g, '')
          .replace(/\s*([\=\.\(\)\:\{\}\,])\s*/g, '$1')
      )
    }
});

