#fcompose 
Utility to compose one or multiple files into one or mulitple places.

It's quite useful to be used as part of some build scripts.


### Example

    var compose = require('compose')

    compose({
        input:  ['a.js' , 'b.js' , 'c.js']
      , output: [
            'path/to/abc_min_1.js'
          , 'path/to/abc_min_2.js'   
        ]
      , processor: function(content, next) {
          next(
            content
              .replace(/^\s*/g, '')
              .replace(/\n*/g, '')
              .replace(/\s*([\=\.\(\)\:\{\}\,])\s*/g, '$1')
          )
        }
    }); 
