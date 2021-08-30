const {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	deleteBlog
} = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../model/resModal')

const loginCheck = (req) => {
	if (!req.session.username) {
		return Promise.resolve(new ErrorModal('未登录'))
	}
}
const handleBlogRouter = (req, res) => {
	const method = req.method
	const { id } = req.query

	if (method === 'GET' && req.path === '/api/blog/list') {
		let loginCheckResult = loginCheck(req)
		if (!loginCheckResult) {
			return loginCheckResult
		}
		const { author, keyword } = req.query
		return getList(author, keyword).then((list) => {
			return new SuccessModal(list)
		})
	}
	if (method === 'GET' && req.path === '/api/blog/detail') {
		let loginCheckResult = loginCheck(req)
		if (!loginCheckResult) {
			return loginCheckResult
		}
		return getDetail(id).then((list) => {
			return new SuccessModal(list)
		})
	}
	if (method === 'POST' && req.path === '/api/blog/add') {
		let loginCheckResult = loginCheck(req)
		if (!loginCheckResult) {
			return loginCheckResult
		}
		req.body.createtime = Date.now()
		req.body.author = req.session.username
		return newBlog(req.body).then((data) => {
			return new SuccessModal(data)
		})
	}
	if (method === 'POST' && req.path === '/api/blog/update') {
		let loginCheckResult = loginCheck(req)
		if (!loginCheckResult) {
			return loginCheckResult
		}
		console.info(req.body, 'req.body')
		return updateBlog(id, req.body).then((val) => {
			if (val) {
				return new SuccessModal()
			} else {
				return new ErrorModal('更新博客失败')
			}
		})
	}
	if (method === 'POST' && req.path === '/api/blog/del') {
		let loginCheckResult = loginCheck(req)
		if (!loginCheckResult) {
			return loginCheckResult
		}
		const author = req.session.username
		return deleteBlog(id, author).then((val) => {
			if (val) {
				return new SuccessModal()
			} else {
				return new ErrorModal('删除博客失败')
			}
		})
	}
}
module.exports = handleBlogRouter
