/*must have Nodejs installed as well as the hapi and good plugins*/

var Hapi = require('hapi');
var Good = require('good');
var fs = require('fs');

var server = new Hapi.Server('localhost', 8000, { cors: true });

var handler = function(request, reply) {
  request.log(['test', 'error'], 'Test event');
};

var postHandler = function(request, reply) {
    //console.log("rawPayload: " + request.rawPayload);
    //console.log("Received POST from " + request.payload.name + "; id=" + (request.payload.id || 'anon'));
/*
    if (request.payload.uploadFile) {
        var f = request.payload.uploadFile;
        console.log("uploadFile " + f.originalFilename + " (" + f.size + " bytes) at " + f.path);
        console.log("that you should persist to storage and remove from temp folder");
        // Use fs for this one: http://nodejs.org/api/fs.html
        Fs.unlink(f.path, function (err) {
            if (err) throw err;
                console.log('successfully deleted ' + f.path);
        });
    }
*/
    server.log("Hello "+request.payload.fname + " " + request.payload.lname);
    //reply("Hello, "+request.payload.fname + " " + request.payload.lname + "!");
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
/*
  {
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
      reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
  },
*/

  {
    method: 'POST',
    path: '/api/post',
    handler: postHandler
  },

  {
    method: '*',
    path: '/{p*}',
    handler: function (request, reply) {
      reply('The page was not found').code(404);
    }
  }
]);
/*
server.route({
    method: 'POST',
    path: '/api/uploadfiles',
    config: {
          payload:{
                maxBytes:209715200,
                output:'stream',
                parse: false
          }, 
          handler: currentposition.uploadFiles,
    }
});
*/
server.pack.register(Good, function (err) {
  if (err) {
      throw err; // something bad happened loading the plugin
  }

  server.start(function () {
      server.log('info', 'Server running at: ' + server.info.uri);
  });

  server.log(['error', 'database', 'read']);

});
