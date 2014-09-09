// Generated by CoffeeScript 1.6.3
(function() {

  var os = require('os');

  var ip = function() {
    var a, addresses, i, _i, _len, _ref;
    _ref = os.networkInterfaces();
    for (i in _ref) {
      addresses = _ref[i];
      for (_i = 0, _len = addresses.length; _i < _len; _i++) {
        a = addresses[_i];
        if (!a.internal && a.family === 'IPv4') {
          return a.address;
        }
      }
    }
  };

  module.exports = ip;

}).call(this);