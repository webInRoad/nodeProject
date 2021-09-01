const crypto = require('crypto')

const SECRET_KEY = 'msdADSDSD'

function md5(content) {
	let md5 = crypto.createHash('md5')
	return md5.update(content).digest('hex')
}

function getPassword(password) {
	const str = `password=${password},key=${SECRET_KEY}`
	return md5(str)
}
console.info(getPassword(123))
module.exports = {
	getPassword
}
