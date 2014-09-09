fs = require('fs');

config = {
    submit: {
        get: function (request, reply) {
            reply.file('client/index.html');
        },
        post: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            }, 
            handler: function(request, reply) {
                reply('ok');
                /*
                var body = '';
                request.payload.file.on('data', function (data) {
                    body += data
                })

                request.payload.file.on('end', function () {
                    var ret = {
                        description: request.payload.description,
                        file: {
                            data: body,
                            filename: request.payload.file.hapi.filename,
                            headers: request.payload.file.hapi.headers
                        }
                    }
                    reply(JSON.stringify(ret));
                })
                */

                // console.log(request.headers);

                /*
                var data = request.payload;
                console.log(data);
                if (data.file != 'undefined') {
                    console.log(data.file);
                    var name = data.file.hapi.filename;
                    var path = __dirname + "/../uploads/" + name;
                    var file = fs.createWriteStream(path);
                    file.on('error', function (err) { 
                        console.error(err) 
                    });
                    data.file.pipe(file);
                    data.file.on('end', function (err) { 
                        reply("Received file: " + name);
                    });
                }
                */
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
            // reply.redirect('/submit');
            reply('not found');
        }
    }
];
