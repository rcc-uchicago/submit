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

Modify the host and port number as appropriate on [these lines of `server.js`  ](https://github.com/rcc-uchicago/submit/blob/master/server/server.js#L4-5) to match those in 'main.js'.

Install dependencies and fire up the server:

```
npm init          # installs dependencies
node server.js
```
Can specify host IP address and port number with command line optiosn "-h" and "-p" respectively. Default values are the IP address for midway-login2 and port 8001.

Example:
```
node server.js -h 0.0.0.0 -p 8080
```
