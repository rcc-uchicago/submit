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
  //reply("Hello, " + request.payload.fname + " " + request.payload.lname + "!");
  request.payload.file.pipe(fs.createWriteStream("test"));
  if (request.payload.file) {
    server.log("Received file: " + request.payload.file);
  }
}

/*
var currentpositionApi = {

    fs : require('fs'),
    multiparty: require('multiparty'),
    uploadFiles:function(req,reply){
         var form = new currentpositionApi.multiparty.Form();
            form.parse(req.payload, function(err, fields, files) {
                currentpositionApi.fs.readFile(files.upload[0].path,function(err,data){
                    var newpath = __dirname + "/"+files.upload[0].originalFilename;
                    currentpositionApi.fs.writeFile(newpath,data,function(err){
                        if(err) console.log(err);
                        else console.log(files)
                    })
                })
                console.log(files)

            });
    }
}
*/
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

