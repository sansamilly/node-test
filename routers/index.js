const {addRouter} = require('../lib/router');

addRouter('get', '/list', require('./list'));
addRouter('post', '/add', require('./add'));
addRouter('post', '/del', require('./del'));