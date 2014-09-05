os = require 'os'

ip = ->
  for i, addresses of os.networkInterfaces()
    for a in addresses
      return a.address if not a.internal and a.family is 'IPv4'

module.exports = ip
