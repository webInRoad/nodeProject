const { exec } = require('../db/mysql')
const xss = require('xss')
const getList = (author, keyword) => {
	let sql = 'select * from blogs where 1 = 1 '
	if (author) {
		sql += `and author = '${author}' `
	}
	if (keyword) {
		sql += `and title like '%${keyword}%' `
	}
	sql += ' order by createtime desc;'
	return exec(sql)
}

getDetail = (id) => {
	let sql = `select * from blogs where id = '${id}'`
	return exec(sql).then((rowData) => {
		return rowData[0]
	})
}
newBlog = (blogData) => {
	let { title, content, createtime, author } = blogData
	title = xss(title)
	const sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}',${createtime},'${author}')`
	console.info(blogData, 'blog data')
	return exec(sql).then((rowData) => {
		return {
			id: rowData.insertId
		}
	})
}
updateBlog = (id, blogData) => {
	const { title, content } = blogData
	const sql = `update blogs set title = '${title}' , content = '${content}' where id = ${id}; `
	console.info(id, blogData, 'id and blog')
	return exec(sql).then((updateData) => {
		return updateData.affectedRows > 0 ? true : false
	})
}
deleteBlog = (id, author) => {
	const sql = `delete from blogs where id = ${id} and author = '${author}'`
	return exec(sql).then((deleteData) => {
		return deleteData.affectedRows > 0 ? true : false
	})
}
module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	deleteBlog
}
