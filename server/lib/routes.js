config = {
    submit: {
        get: function (request, reply) {
            reply.file('client/index.html');
        },
        origpost: {
            payload: {
                maxBytes: 209715200,
                output: 'stream',
                parse: true
            }, 
            handler: function(request, reply) {
                console.log(request.payload.first);
                console.log(request.payload.file.hapi);
                if (request.payload.file.hapi) {
                    var name = request.payload.file.hapi.filename;
                    var path = __dirname + "/../uploads/" + name;
                    var file = fs.createWriteStream(path);
                    file.on('error', function(err) { console.log(err) });
                    request.payload.file.pipe(file);
                    console.log("Received file: " + name);
                }
                request.on('error', function(err) { console.log(err) });
            }
        },
        post: {
            payload: {
                maxBytes: 209715200,
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            }, 
            handler: function(request, reply) {
                var data = request.payload;
                // request.once('disconnect', function () {
                //    console.error('request aborted');
                // });
                if (data.file.hapi) {
                    var name = data.file.hapi.filename;
                    var path = __dirname + "/../uploads/" + name;
                    var file = fs.createWriteStream(path);
                    file.on('error', function (err) { 
                        console.error(err) 
                    });
                    data.file.pipe(file);
                    data.file.on('end', function (err) { 
                        // console.log("Received file: " + name);
                        reply('done') 
                    });
                }
            }
        }
    }
}

module.exports = [
    {
        method: 'GET',
        path: '/upload',
        handler: config.submit.get
    },
    {
        method: 'POST',
        path: '/submit',
        config: config.submit.origpost
    },
    {
        method: 'GET',
        path: '/client/{path*}',
        handler: {
            directory: {
                path: 'client'
            }
        }
    },
    {
        method: '*',
        path: '/{path*}',
        handler: function (request, reply) {
            // reply.redirect('/submit');
            reply('not found');
        }
    }
];
