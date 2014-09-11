var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require('../');
//-----------------------------------------------------------------------------
// credentials
var username = 'limt';
var password = 'wistful.walrus72';
//-----------------------------------------------------------------------------

lab.experiment('fileupload', function() {
    lab.test('require authentication', function(done) {
        var options = {
            method: 'GET',
            url: '/submit',
        }
        server.inject(options, function(response) {
            Lab.expect(response.statusCode).to.equal(401); // 401 not authorized
            done();
        })
    });
	
    lab.test('authentication successful', function(done) {
        var options = {
            method: 'GET',
            url: '/submit',
            credentials: {
                username: username,
                password: password
            }
        }
        server.inject(options, function(response) {
            Lab.expect(response.statusCode).to.equal(200);
            done();
        })
    });

    lab.test('name field submission', function(done) {
        var options = {
            method: 'POST',
            url: '/submit',
            credentials: {
                username: username,
                password: password
            },
            payload: {
                fname: 'TJ',
                lname: 'Lim',
                upload: {
                    hapi: { filename: 'test2.csv',
                        headers: { 
                            'content-disposition': 'form-data; name="upload"; filename="test2.csv"',
                            'content-type': 'text/csv'
                        }
                    }
                }
            }
        }
        server.inject(options, function(response) {
            var result = response.result,
            payload = options.payload;
            Lab.expect(response.statusCode).to.equal(200);
            Lab.expect(result.fname).to.equal(payload.fname);
            Lab.expect(result.lname).to.equal(payload.lname);
            Lab.expect(result.upload).to.equal(payload.upload);
            done();
        })
    });
});

