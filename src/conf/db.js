const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIC_CONF
if (env === 'dev') {
	MYSQL_CONF = {
		host: 'localhost',
		port: '3306',
		user: 'root',
		password: '123456',
		database: 'myblog'
	}
	REDIC_CONF = {
		port: '6379',
		host: '127.0.0.1'
	}
}
if (env === 'production') {
	MYSQL_CONF = {
		host: 'localhost',
		port: '3306',
		user: 'root',
		password: '123456',
		database: 'myblog'
	}
	REDIC_CONF = {
		port: '6379',
		host: '127.0.0.1'
	}
}
module.exports = {
	MYSQL_CONF,
	REDIC_CONF
}
