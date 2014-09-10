var fs = require('fs');

var postHandler = function(request, reply) {
  console.log("Connection made!")
  var payload = request.payload;
  console.log("Hello " + payload.fname + " " + payload.lname);
  var data = payload.upload;
	if (data.hapi) {
	  var fname = data.hapi.filename;
	  var path = __dirname + "/../uploads/" + fname;
	  var save = fs.createWriteStream(path);
	  save.on('error', function(err) {console.log(err)});
	  data.pipe(save);
	  console.log("Received file: " + fname);
		request.on('error', function(err) {
		  console.log(err);
		});
	}
}

module.exports = [
  { 
		method: 'GET', 
    path: '/{path*}', 
    handler: {
    	directory: {
    		path: 'client',
    		listing: false,
    		index: false
    	}
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
];
