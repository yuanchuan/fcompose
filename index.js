
var fs      = require('fs')
  , mkdirp  = require('mkdirp')
  , dirname = require('path').dirname;


/**
 * Compose mutiple files to mutiple places. 
 * 
 * Config: 
 * 
 *  - `input`:     input file paths {String|Array}
 *  - `output`:    ouput file paths {String|Array}
 *  - `processor`: specify the way to process each input files [Function]
 *  - `done`:      callback function after the progress is done [Function]
 *  
 * Example:
 *  
 *   compose({
 *     input: ['a.txt', 'b.txt'],
 *     output: 'result.txt'
 *     processor: function(buffer, next) {
 *       next( buffer.toString().length );
 *     },
 *     done: function(stamp) {
 *       console.log(stamp);
 *     }
 *   });
 * 
 * @param {Object} config
 * @api public
 */
module.exports = function(config) {

  if (Object(config) !== config) {
    var args = [].slice.call(arguments);
    config = {};
    ['input', 'output', 'processor', 'done'].forEach(function(conf, i) {
      config[conf] = args[i];
    });
  }

  var input = makeArray(config.input)
    , streams = makeWriteStreams(config.output)
    , chain = Chain()
    , timeStart = Date.now();

  var next = function() {
    [].slice.call(arguments).forEach(function(result){
      streams.write(result);
    });
    chain.next(); 
  }

  var processor = function(err, buffer) {
    if (err) throw err;
    if (config.processor) {
      config.processor(buffer, next);
    } else {
      next(content);
    }
  }

  chain
    .add(
      input.map(function(n) {
        return function() {
          fs.readFile(n, processor)
        };
      })
    )
    .traverse(function() {
      streams.end();
      if (config.done) {
        var stamp = Date.now() - timeStart;
        config.done(stamp);
      }
    });
}
 

/**
 * Arrayify elements    
 */
function makeArray(elem) {
  return Array.isArray(elem) ? elem : [elem];
}


/**
 * Call mutiple writestreams in one place
 */
function makeWriteStreams(paths) {
  var expose = {}
    , streams = makeArray(paths).map(function(p) {
        mkdirp.sync(dirname(p));
        return fs.createWriteStream(p);   
      });
  ['write', 'end'].forEach(function(method) {
    expose[method] = function() {
      var args = arguments;
      streams.forEach(function(stream) {
        stream[method].apply(stream, args);  
      });
    };
  });
  return expose;
}


/**
 * Simple abstract container for writing async javascript.
 */
function Chain() {
  var queue = [].slice.call(arguments)
    , expose = {};
  expose.add = function() {
    var jobs = [].slice.call(arguments);
    jobs.forEach(function(job) {
      queue.push.apply(queue, makeArray(job));
    });
    return this;
  }
  expose.next = function() {
    if (queue.length) {
      queue.shift().call();    
    } else {
      this.onend && this.onend();
    }
  }  
  expose.traverse = function(fn) {
    this.next();
    this.onend = fn;
    return this;
  }
  return expose;
}

