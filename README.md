#fcompose 
>Compose one or multiple files into one or mulitple places.

## Installation

```bash
$ npm install fcompose
```

## Example

**fcompose as a pipeline**

```javascript
var compose = require('fcompose');

compose('origin.txt', 'output.txt', function(buffer, next) {
  next(             
    buffer.toString().toUpperCase()
  );
});
```     

**fcompose as a packer**

```javascript
var compose = require('fcompose')

compose({
    input:  ['a.js' , 'b.js' , 'c.js']
  , output: ['path/to/abc.js', 'path/to/abc2.js']
  , processor: function(buffer, next) {
      next(minify(buffer.toString())
    },
  , done: function(stamp) {
      console.log(stamp);
    }
}); 

// Quick and dirty way to strip white spaces.
function minify(input) {
  return input
    .replace(/^\s*/g, '')
    .replace(/\n*/g, '')
    .replace(/\s*([\=\.\(\)\:\{\}\,])\s*/g, '$1') 
}
```

## License
MIT
