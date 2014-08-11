# How to handle `multipart/form-data`

Use [this example](https://github.com/paullang/hapi-post-example/blob/master/index.js) as a starting point.

Now consider ...

```javascript
server.route({
   method: 'POST',
   path: '/upload',
   config: {
      payload:{
            maxBytes: 209715200,
            output:'stream',
            parse: true
      }, 
      handler: function (request, reply) {
          request.payload["htmlInputName"].pipe(fs.createWriteStream("test"));
      }
});
```

Note use of the `payload` attribute in the [response object](http://hapijs.com/api#response-object):

- `payload` - determines how the request payload is processed:
    - `output` - the type of payload representation requested where:
        - `data` - the incoming payload is read fully into memory. If `parse` is `true`, the payload is parsed (JSON, form-decoded, multipart) based on the 'Content-Type' header. If `parse` is false, the raw `Buffer` is returned. This is the default value except when a proxy handler is used.
        - `stream` - the incoming payload is made available via a `Stream.Readable` interface. If the payload is 'multipart/form-data' and `parse` is `true`, fields values are presented as text while files are provided as streams. File streams from a 'multipart/form-data' upload will also have a property `hapi` containing `filename` and `headers` properties.
        - `file` - the incoming payload in written to temporary file in the directory specified by the server's `payload.uploads` settings.  If the payload is 'multipart/form-data' and `parse` is `true`, fields values are presented as text while files are saved.
    - `parse` - can be `true`, `false`, or `gunzip`; determines if the incoming payload is processed or presented raw. `true` and `gunzip` includes gunzipping when the appropriate 'Content-Encoding' is specified on the received request. If parsing is enabled and the 'Content-Type' is known (for the whole payload as well as parts), the payload is converted into an object when possible. If the format is unknown, a Bad Request (400) error response is sent. Defaults to `true`, except when a proxy handler is used. The supported mime types are:
        - 'application/json'
        - 'application/x-www-form-urlencoded'
        - 'application/octet-stream'
        - 'text/*'
        - 'multipart/form-data'
    - `allow` - a string or an array of strings with the allowed mime types for the endpoint. Defaults to any of the supported mime types listed above. Note that allowing other mime types not listed will not enable them to be parsed, and that if parsing mode is `'parse'`, the request will result in an error response.
    - `override` - a mime type string overriding the 'Content-Type' header value received. Defaults to no override.
    - `maxBytes` - overrides the server [default value](#server.config.payload) for this route.
    - `uploads` - overrides the server [default value](#server.config.payload) for this route.
    - `failAction` - determines how to handle payload parsing errors. Allowed values are:
        - `'error'` - return a Bad Request (400) error response. This is the default value.
        - `'log'` - report the error but continue processing the request.
        - `'ignore'` - take no action and continue processing the request.

* See [this stackoverflow question](http://stackoverflow.com/questions/21823379/how-to-upload-files-using-nodejs-and-hapi) for clarification on how to handle `multipart/form-data` with file uploads.

* Consider using the [multiparty](https://github.com/andrewrk/node-multiparty) or [busboy](https://github.com/mscdex/busboy) modules along the lines suggested [here](http://stackoverflow.com/a/21846701).
