var postHandler = function(request, reply) {
  console.log("Connection made!")
  console.log("Hello " + request.payload.fname + " " + request.payload.lname);
	if (request.payload.upload0.hapi) {
	  var fname0 = request.payload.upload0.hapi.filename;
	  var save0 = fs.createWriteStream("./uploads/".concat(fname0));
	  request.payload.upload0.pipe(save0);
	  request.on('error', function(err) {
	    console.log(err);
	  });
	  console.log("Received file: " + fname0);
	}

	if (request.payload.upload1.hapi) {
	  var fname1 = request.payload.upload1.hapi.filename;
	  var save1 = fs.createWriteStream("./uploads/".concat(fname1));
	  request.payload.upload1.pipe(save1);
	  request.on('error', function(err) {
		  console.log(err);
		});
		console.log("Received file: " + fname1);
	}

	if (request.payload.upload2.hapi) {
	  var fname2 = request.payload.upload2.hapi.filename;
	  var save2 = fs.createWriteStream("./uploads/".concat(fname2));
	  request.payload.upload1.pipe(save2);
	  request.on('error', function(err) {
	    console.log(err);
	  });
	  console.log("Received file: " + fname2);
	}

	if (request.payload.upload3.hapi) {
	  var fname3 = request.payload.upload3.hapi.filename;
	  var save3 = fs.createWriteStream("./uploads/".concat(fname3));
	  request.payload.upload1.pipe(save3);
	  request.on('error', function(err) {
	    console.log(err);
	  });
	  console.log("Received file: " + fname3);
	}

	if (request.payload.upload4.hapi) {
	  var fname4 = request.payload.upload4.hapi.filename;
	  var save4 = fs.createWriteStream("./uploads/".concat(fname4));
	  request.payload.upload1.pipe(save4);
	  request.on('error', function(err) {
	    console.log(err);
	  });
	  console.log("Received file: " + fname4);
	}
}

module.exports = [
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
];
