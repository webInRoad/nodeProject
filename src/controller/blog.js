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
	return {
		id: 1,
		title: '标题A',
		content: '内容A',
		createTime: 1630168477062,
		author: 'zhangsan'
	}
}
newBlog = (blogData) => {
	console.info(blogData, 'blog data')
	return {
		id: 3
	}
}
updateBlog = (id, blogData) => {
	console.info(id, blogData, 'id and blog')
	return false
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
