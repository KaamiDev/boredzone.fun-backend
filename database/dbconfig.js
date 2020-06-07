var db = require('diskdb');
db = db.connect('./database/DB', [ 'users', 'ideas' ]);

module.exports = db;
