# Submit

A simple web service for submitting/validating file uploads and associated
metadata.  We provide a sample web-client along with the web server,
potentially useful as a starting template.

You can view [a minimalist demo of the client front-end](http://rcc-uchicago.github.io/submit/). The demo submits user-specified form and file data to a Midway endpoint.


## Usage

#### Client

Modify the form elements in [`client/index.html`](https://github.com/rcc-uchicago/submit/blob/master/client/index.html#L40-L52) according to your needs.

The client assumes the server is running on `localhost` using port `8001`.  If
you run the server elsewhere, be sure to change the `host` and `port` vars in [`client/main.js`](https://github.com/rcc-uchicago/submit/blob/master/client/main.js#L4-5).

#### Server

Install dependencies and fire up the server:

```
cd server
npm install         # installs dependencies
npm run server      # uses `localhost:8001`
```

... or ...

```
node server.js --host 127.0.0.1 --port 8001
```

... to specify a particular host or port.

#### Fork-n-go

Follow these steps to fork the repository with fork-n-go:  
1. Create a github account.  
2. Fork the rcc-uchicago/submit repository.  
3. Make and commit changes to the client files in the gh-pages branch.  
4. Website will be live at "http://username.github.io/repository", where username is your github username (originally "rcc-uchicago") and repository is the name that you give your forked repository (originally "submit").  

Visit [fork-n-go](http://jlord.github.io/forkngo/)  for more information.
