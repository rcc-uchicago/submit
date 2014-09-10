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
                var data = request.payload;

                // show fields from form-data
                console.log(data.firstName, data.lastName);

                if (data.file && data.file != 'undefined') {
                    console.log(data.file.hapi.headers);

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
