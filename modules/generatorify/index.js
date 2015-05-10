'use strict'

// This can be proted to native Promises
const q = require('q')

// Transform function with callback to generator
function generatorify(fn, context) {
  return function() {
    const deferred = q.defer(),
          callback = makeCallback(deferred),
          args     = Array.prototype.slice.call(arguments).concat(callback)

    fn.apply(context, args)
    return deferred.promise
  };
}

// Make callback function
function makeCallback(deferred) {
  return function (err) {
    if (err) {
      deferred.reject(err)
    } else if (arguments.length < 2) {
      deferred.resolve()
    } else if (arguments.length === 2) {
      deferred.resolve(arguments[1])
    } else {
      deferred.resolve(Array.prototype.slice.call(arguments, 1))
    }
  };
}

// And export `generatorify`
module.exports = generatorify
