const redis = require('redis')
const { REDIC_CONF } = require('../conf/db')

const { host, port } = REDIC_CONF
const redisClient = redis.createClient(port, host)
redisClient.on('error', (err) => {
	console.info(err)
})
function set(key, value) {
	if (typeof value === 'object') {
		value = JSON.stringify(value)
	}
	redisClient.set(key, value, redis.print)
}
function get(key) {
	const promise = new Promise((resovle, reject) => {
		redisClient.get(key, (err, value) => {
			if (err) {
				reject(err)
				return
			}
			if (value == null) {
				resovle(null)
				return
			}
			try {
				resovle(JSON.parse(value))
			} catch (error) {
				resovle(value)
			}
		})
	})
	return promise
}
module.exports = {
	get,
	set
}
