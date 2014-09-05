var Hapi = require('hapi');
var Good = require('good');
var Joi = require('joi');
var fs = require('fs');
var parse = require('minimist');
var os = require('os');
var getPort = require('get-port');


function getIPAddress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}

getPort(function (e, p) {
	console.log(p);
});

var options = {
  alias: {
    host: 'h',
    port: 'p'
  },
  "default": {
    host: getIPAddress(),  // midway-login2 is 128.135.112.72
    port: 8001
  }
};

var argv = parse(process.argv.slice(2), options);

var server = new Hapi.Server(argv.host, argv.port, { cors: true });

var handler = function(request, reply) {
  request.log(['test', 'error'], 'Test event');
};

var postHandler = function(request, reply) {
  server.log("Connection made!")
  server.log("Hello " + request.payload.fname + " " + request.payload.lname);
	if (request.payload.upload0.hapi) {
	  var fname0 = request.payload.upload0.hapi.filename;
	  var save0 = fs.createWriteStream("./uploads/".concat(fname0));
	  request.payload.upload0.pipe(save0);
	  request.on('error', function(err) {
	    server.log(err);
	  });
	  server.log("Received file: " + fname0);
	}
}

server.route([
  {
    method: 'GET',
    path: '/{user?}',
    handler: function (request, reply) {
      var user = request.params.user ? encodeURIComponent(request.params.user) : 'world!'; 
      reply('Hello ' + user + '!');
    }
  },

  {
    method: 'POST',
    path: '/submit',
    config: {
      payload:{
        maxBytes: 209715200,
        output:'stream',
        parse: true
      }, 
      handler: postHandler,
  	}
  },

  {
    method: '*',
    path: '/{p*}',
    handler: function (request, reply) {
      reply('The page was not found').code(404);
    }
  }
]);

server.pack.register(Good, function (err) {
  if (err) { throw err; }
  server.start(function () {
    server.log('Server running at: ' + server.info.uri);
  });

});


