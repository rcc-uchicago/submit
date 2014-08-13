/*must have Nodejs installed as well as the hapi and good plugins*/

var Hapi = require('hapi');
var Good = require('good');
var fs = require('fs');

var server = new Hapi.Server('localhost', 8000, { cors: true });

var handler = function(request, reply) {
  request.log(['test', 'error'], 'Test event');
};

var postHandler = function(request, reply) {
  server.log("POST request received")

  if (request.payload.fname) {
    if (request.payload.lname) {
      server.log("Hello " + request.payload.fname + " " + request.payload.lname);
    } else {
      server.log("Hello " + request.payload.fname);
    }
  } else if (request.payload.lname) {
    server.log("Hello " + request.payload.lname);
  }

  if (request.payload.descript) {
    server.log("About file: " + request.payload.descript);
  }


  if (request.payload.uploadedFile.hapi) {
    var fname = request.payload.uploadedFile.hapi.filename;
    var save = fs.createWriteStream("./uploads/".concat(fname));
    request.payload.uploadedFile.pipe(save);
    request.on('error', function(err) {
      server.log(err);
    });

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
  //server.log(['error', 'database', 'read']);

});

