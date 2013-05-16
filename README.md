#fcompose 
>Compose one or multiple files into one or mulitple places.

## Installation

```bash
$ npm install fcompose
```

## Example

fcompose as a pipe

```javascript
compose('origin.txt', 'output.txt', function(buffer, next) {
  next(             
    buffer.toString().toUpperCase()
  );
});
```     

Compose and minimize 3 js files to 2 places 

```javascript
var compose = require('fcompose')

compose({
    input:  ['a.js' , 'b.js' , 'c.js']
  , output: [ 'path/to/abc.js' , 'path/to/abc2.js']
  , processor: function(buffer, next) {
      next(
        buffer.toString()
          .replace(/^\s*/g, '')
          .replace(/\n*/g, '')
          .replace(/\s*([\=\.\(\)\:\{\}\,])\s*/g, '$1')
      )
    }
}); 
```

## License
MIT
