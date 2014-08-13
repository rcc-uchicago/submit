/*must have Nodejs installed as well as the hapi and good plugins*/

var Hapi = require('hapi');
var Good = require('good');
var fs = require('fs');
var multiparty = require('multiparty')
  , http = require('http')
  , util = require('util')

var server = new Hapi.Server('localhost', 8000, { cors: true });

var handler = function(request, reply) {
  request.log(['test', 'error'], 'Test event');
};

var postHandler = function(request, reply) {
  server.log("Hello " + request.payload.fname + " " + request.payload.lname);
  if (request.payload.aboutfile) {
    server.log("About file: " + request.payload.aboutfile);
  }

  request.payload.file.pipe(fs.createWriteStream("test"));
  if (request.payload.file) {
    server.log("Received file: " + request.payload.file);
  }

  //reply("Hello, " + request.payload.fname + " " + request.payload.lname + "!");
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
    path: '/api/post',
    config: {
        payload:{
              maxBytes: 209715200,
              output:'stream',
              parse: true
        }, 
        handler: postHandler
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

  server.log(['error', 'database', 'read']);

});

