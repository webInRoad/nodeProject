const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 建立连接
con.connect()

function exec(sql) {
	const promise = new Promise((resolve, reject) => {
		con.query(sql, (err, result) => {
			if (err) {
				console.info(err)
				reject(err)
			}
			resolve(result)
		})
	})
	return promise
}
module.exports = {
	exec,
	escape: mysql.escape
}
