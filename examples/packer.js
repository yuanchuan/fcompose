var compose = require('../')

compose({
    input:  ['packer.js', 'multi.js']
  , output: 'result/packer_all.js'
  , processor: function(buffer, next) {
      next(
        minify(buffer.toString())
      ) 
    }
});


function minify(input) {
  return input
    .replace(/^\s*/g, '')
    .replace(/\n*/g, '')
    .replace(/\s*([\=\.\(\)\:\{\}\,])\s*/g, '$1');
}
