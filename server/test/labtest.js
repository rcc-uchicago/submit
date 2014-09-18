//Testing hapi server with lab
var Hapi = require('hapi');
var fs = require('fs');
var FormData = require('form-data');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require(__dirname + '/../');
var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;
//-----------------------------------------------------------------------------
// credentials
var username = ''; //do not commit with actual username
var password = ''; // do not commit with actual password
var firstname = 'Bob';
var lastname = 'Jones';
var filename = 'test2.csv';
//-----------------------------------------------------------------------------

var postHandler = function(request, reply) {
    console.log('Connection made!')
    var payload = request.payload;
    //console.log(payload);
    console.log('Hello ' + payload.fname + ' ' + payload.lname);
    var data = payload.upload;
    
    if (data) {
        if (data.hapi) {
            var filename = data.hapi.filename;
            var path = __dirname + '/../uploads/' + filename;
            var save = fs.createWriteStream(path);
            save.on('error', function(err) { console.log(err) });
            //data.pipe(save);
            console.log('Received file: ' + filename);
            request.on('error', function(err) {
                console.log(err);
            });
        }
    }
    
    reply(payload);
};

describe('login', function() {

    it('login unsuccessful', function(done) {
        var options = {
            method: 'GET',
            url: '/submit',
        }
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(401);
            done();
        })
    });

    it('login successful', function (done) {
        var options = {
            method: 'GET',
            url: '/submit',
            credentials: {
                username: username,
                password: password
            }
        }
        server.inject(options, function (res) {
            expect(res.statusCode).to.equal(200);
            done();
        })
    });

    it('payload test', function (done) {
        var server = new Hapi.Server();
        server.route({ 
            method: 'POST', 
            path: '/submit', 
            config: { handler: postHandler }
        });

        var payload = {
            fname: 'Bob',
            lname: 'Jones',
            upload: {
                hapi: {
                    filename: filename
                }
            }
        };

        var options = {
            method: 'POST',
            url: '/submit',
            credentials: {
                username: username,
                password: password
            },
            headers: headers,
            payload: payload
        };
        var headers = {
            'content-Type': 'multipart/form-data; boundary=----------------------------24ec3aaa82b3'
        };
        server.inject(options, function (res) {
            expect(res.statusCode).to.equal(200);
            expect(res.result.fname).to.equal(payload.fname);
            expect(res.result.lname).to.equal(payload.lname);
            expect(res.result.upload.hapi.filename).to.equal(payload.upload.hapi.filename);

            done();
        });
    });
    
    
});



