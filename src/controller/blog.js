const { exec } = require('../db/mysql')

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
	const { title, content, createtime, author } = blogData
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
deleteBlog = (id) => {
	return true
}
module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	deleteBlog
}
