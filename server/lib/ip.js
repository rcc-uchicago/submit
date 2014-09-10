(function () {
	var os = require('os');
	var ip = function() {
		var alias, addrs, i, j, ref;
		ref = os.networkInterfaces();
		for (i in ref) {
		  addrs = ref[i];
		  for (j = 0; j < addrs.length; j++) {
		    alias = addrs[j];
		    if (alias.family === 'IPv4' && !alias.internal) {
		      return alias.address;
		  	}
		  }
		}
		return '0.0.0.0';
	};
	module.exports = ip;
}).call(this);
