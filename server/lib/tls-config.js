fs = require('fs');

module.exports = {
  key: fs.readFileSync(__dirname + "/../private/key.pem"),
  cert: fs.readFileSync(__dirname + "/../private/cert.pem")
}
