var compose = require('../');

compose('uppercase.js', 'uppercase-result.js', function(buf, next) {
  next(
    buf.toString().toUpperCase()
  )
});
