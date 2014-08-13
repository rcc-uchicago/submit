var Hapi = require('hapi');
var Good = require('good');
var fs = require('fs');

var server = new Hapi.Server('localhost', 8000, { cors: true });

server.route({
   method: 'POST',
   path: '/submit',
   config: {
      payload:{
            maxBytes: 209715200,
            output:'stream',
            parse: true
      }, 
      handler: function (request, reply) {
          console.log(request.payload);
          var fname = request.payload.uploadedFile.hapi.filename;
          var save = fs.createWriteStream('./uploads/'.concat(fname));
          request.payload.uploadedFile.pipe(save);
      }
  }
});

server.pack.register(Good, function (err) {
  if (err) {
      throw err; // something bad happened loading the plugin
  }

  server.start(function () {
      server.log('info', 'Server running at: ' + server.info.uri);
  });

  server.log(['error', 'database', 'read']);
});
