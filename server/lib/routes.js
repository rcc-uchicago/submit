config = {
    submit: {
        get: function (request, reply) {
            reply.file('client/index.html');
        },
        post: {
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
        }
    }
}

module.exports = [
    {
        method: 'GET',
        path: '/submit',
        handler: config.submit.get
    },
    {
        method: 'POST',
        path: '/submit',
        config: config.submit.post
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
            reply.redirect('/submit');
        }
    }
];
