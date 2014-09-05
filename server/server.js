var Hapi = require('hapi');
var Good = require('good');
var parse = require('minimist');
var getIP = require('lib/ip');
var routes = require('lib/routes');

var options = {
  alias: {
    host: 'h',
    port: 'p'
  },
  "default": {
    host: getIP(),
    port: 8001
  }
};

var argv = parse(process.argv.slice(2), options);

var server = new Hapi.Server(argv.host, argv.port, { cors: true });

server.route(routes);

server.pack.register(Good, function (err) {
  if (err) {
    throw err; // something bad happened loading the plugin
  }
  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
