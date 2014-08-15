# Submit

A simple web service for submitting/validating file uploads and associated
metadata.  We provide a sample web-client along with the web server,
potentially useful as a starting template.

You can view [a minimalist demo of the client front-end](http://rcc-uchicago.github.io/submit/). The demo submits user-specified form and file data to a Midway endpoint.


## Usage


#### Client

Modify the form elements in `client/index.html` according to your needs.

Change the url on [this line of `main.js`](https://github.com/rcc-uchicago/submit/blob/master/client/main.js#L47) to reflect the hostname and port of
the server.


#### Server

Modify the host and port number as appropriate on [this line of `server.js`  ](https://github.com/rcc-uchicago/submit/blob/master/server/server.js#L7) 

Install dependencies and fire up the server:

```
npm init          # installs dependencies
node server.js
```
