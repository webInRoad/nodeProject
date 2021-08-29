const {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	deleteBlog
} = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../model/resModal')
const handleBlogRouter = (req, res) => {
	const method = req.method
	const { id } = req.query

	if (method === 'GET' && req.path === '/api/blog/list') {
		const { author, keyword } = req.query
		return getList(author, keyword).then((list) => {
			return new SuccessModal(list)
		})
	}
	if (method === 'GET' && req.path === '/api/blog/detail') {
		const data = getDetail(id)
		return new SuccessModal(data)
	}
	if (method === 'POST' && req.path === '/api/blog/add') {
		const data = newBlog(req.body)
		return new SuccessModal(data)
	}
	if (method === 'POST' && req.path === '/api/blog/update') {
		console.info(req.body, 'req.body')
		const data = updateBlog(id, req.body)
		if (data) {
			return new SuccessModal()
		} else {
			return new ErrorModal('更新博客失败')
		}
	}
	if (method === 'POST' && req.path === '/api/blog/del') {
		const flag = deleteBlog(id)
		if (flag) {
			return new SuccessModal()
		} else {
			return new ErrorModal('删除博客失败')
		}
	}
}
module.exports = handleBlogRouter
