const getList = (author, keyword) => {
	return [
		{
			id: 1,
			title: '标题A',
			content: '内容A',
			createTime: 1630168477062,
			author: 'zhangsan'
		},
		{
			id: 2,
			title: '标题B',
			content: '内容B',
			createTime: 1620168477062,
			author: 'lisi'
		}
	]
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
