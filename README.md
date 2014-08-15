# Submit

A simple web service for submitting/validating file uploads and associated
metadata.  We provide a sample web-client along with the web server.

Here is a link to the demo:
http://rcc-uchicago.github.io/submit/

To test the demo web service, copy the client files to where you would like to host them. Make sure to copy the bootstrap directory, so the boostrap file pathways stay the same.

The client files include the following:  
  index.html  
  main.js  
  mystyle.css  
  dist/css/bootstrap.css  
  dist/js/bootstrap.css  
  dist/fonts/glyphicons-halflings-regular.eot  
  dist/fonts/glyphicons-halflings-regular.svg  
  dist/fonts/glyphicons-halflings-regular.ttf  
  dist/fonts/glyphicons-halflings-regular.woff  

To run the server, first install modules initialize with this command: npm init  
To finally run the server, type in the following command: node server.js

The host IP address is currently set to midway-login2.  
The port number is currently set to 8000. To change the port number, replace 8000 in server.js and main.js with the new port number of your choice.
