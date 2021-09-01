const { exec, escape } = require('../db/mysql')
const { getPassword } = require('../utils/cryp')
const login = (username, password) => {
	username = escape(username)
	password = getPassword(password)
	password = escape(password)
	const sql = `select username,realname from users where username = ${username} and password = ${password}`
	return exec(sql).then((data) => {
		return data[0] || {}
	})
}
module.exports = { login }
