const { getList, getDetail } = require('../controller/blog')
const { SuccessModal } = require('../model/resModal')
const handleBlogRouter = (req, res) => {
	const method = req.method

	if (method === 'GET' && req.path === '/api/blog/list') {
		const { author, keyword } = req.query
		const list = getList(author, keyword)
		return new SuccessModal(list)
	}
	if (method === 'GET' && req.path === '/api/blog/detail') {
		const { id } = req.query
		const data = getDetail(id)
		return new SuccessModal(data)
	}
	if (method === 'POST' && req.path === '/api/blog/add') {
		return {
			msg: '新增博客的接口'
		}
	}
	if (method === 'POST' && req.path === '/api/blog/update') {
		return {
			msg: '更新博客的接口'
		}
	}
	if (method === 'POST' && req.path === '/api/blog/del') {
		return {
			msg: '删除博客的接口'
		}
	}
}
module.exports = handleBlogRouter
