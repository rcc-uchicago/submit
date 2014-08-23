# Submit

A simple web service for submitting/validating file uploads and associated
metadata.  We provide a sample web-client along with the web server,
potentially useful as a starting template.

You can view [a minimalist demo of the client front-end](http://rcc-uchicago.github.io/submit/). The demo submits user-specified form and file data to a Midway endpoint.


## Usage

#### Client

Modify the form elements in `client/index.html` according to your needs.

Change the hostname and port for the server on [these lines of `main.js`](https://github.com/rcc-uchicago/submit/blob/master/client/main.js#L4-5).  
The url of the server reflects the hostname and port [here](https://github.com/rcc-uchicago/submit/blob/master/client/main.js#L58). 

#### Server

Install dependencies and fire up the server:

```
cd server
npm install         # installs dependencies
npm run server
```

... or ...

```
node server.js --host 127.0.0.1 --port 8080
```

... to specify a particular host and port.
