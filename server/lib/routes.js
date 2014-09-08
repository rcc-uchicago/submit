var postHandler = function(request, reply) {
  console.log(request.payload.form);
	if (request.payload.upload.hapi) {
	  var name = request.payload.upload.hapi.filename;
    var path = __dirname + "/uploads/" + name
	  var file = fs.createWriteStream(path);
	  request.payload.upload.pipe(file);
	  request.on('error', function(err) { console.log(err) });
	  console.log("Received file: " + name);
	}
}

module.exports = [
    {
        method: 'GET',
        path: '/submit',
        handler: function (request, reply) {
            reply.file('/public/submit.html');
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
            reply('Page not found').code(404);
        }
    }
];
