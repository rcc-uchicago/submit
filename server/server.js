var Hapi = require('hapi');
var Path = require('path');
var parse = require('minimist');
var routes = require('lib/routes');
var ip = require('lib/ip');


var config = {
    argv: {
        alias: {
            host: 'h',
            port: 'p'
        },
        "default": {
            host: ip(),     // detect an ip address
            port: 8001
        }
    },
    server: {
        // cors: true,
        // tls: require('lib/tls-config.js'),
        files: { relativeTo: Path.join(__dirname, 'public') }
    }
};

var argv = parse(process.argv.slice(2), config.argv);

var server = new Hapi.Server(argv.host, argv.port, config.server);

server.route(routes);

server.start(function () {
    console.log('info', 'Server running at: ' + server.info.uri);
});
