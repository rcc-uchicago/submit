//-----------------------------------------------------------------------------
// Host and port configuration

var host = "0.0.0.0"  //midway-login2 is 128.135.112.72
var port = "8001"

//-----------------------------------------------------------------------------

var Hapi = require('hapi');
var Good = require('good');
var Joi = require("joi");
var fs = require('fs');

var server = new Hapi.Server(host, port, { cors: true });

var handler = function(request, reply) {
  request.log(['test', 'error'], 'Test event');
};

var postHandler = function(request, reply) {
  server.log("Connection made!")

  //validation
	var configSchema = Joi.object({
		fname: Joi.string().regex(/^[a-zA-Z]+$/).required(),
		lname: Joi.string().regex(/^[a-zA-Z]+$/).required()
	});
  var config = {
		fname: request.payload.fname,
		lname: request.payload.lname
  }
  var nameValid = Joi.validate(config, configSchema, {abortEarly: false});
  if (nameValid.error) {
    server.log("Name fields cannot contain numbers or symbols");
  } else { //when validation tests pass
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

		if (request.payload.upload1.hapi) {
		  var fname1 = request.payload.upload1.hapi.filename;
		  var save1 = fs.createWriteStream("./uploads/".concat(fname1));
		  request.payload.upload1.pipe(save1);
		  request.on('error', function(err) {
		    server.log(err);
		  });
		  server.log("Received file: " + fname1);
		}

		if (request.payload.upload2.hapi) {
		  var fname2 = request.payload.upload2.hapi.filename;
		  var save2 = fs.createWriteStream("./uploads/".concat(fname2));
		  request.payload.upload1.pipe(save2);
		  request.on('error', function(err) {
		    server.log(err);
		  });
		  server.log("Received file: " + fname2);
		}

		if (request.payload.upload3.hapi) {
		  var fname3 = request.payload.upload3.hapi.filename;
		  var save3 = fs.createWriteStream("./uploads/".concat(fname3));
		  request.payload.upload1.pipe(save3);
		  request.on('error', function(err) {
		    server.log(err);
		  });
		  server.log("Received file: " + fname3);
		}

		if (request.payload.upload4.hapi) {
		  var fname4 = request.payload.upload4.hapi.filename;
		  var save4 = fs.createWriteStream("./uploads/".concat(fname4));
		  request.payload.upload1.pipe(save4);
		  request.on('error', function(err) {
		    server.log(err);
		  });
		  server.log("Received file: " + fname4);
		}
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
  if (err) {
    throw err; // something bad happened loading the plugin
  }
  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
  //server.log(['error', 'database', 'read']);
});

