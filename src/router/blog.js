const handleBlogRouter = (req, res) => {
	const method = req.method

	if (method === 'GET' && req.path === '/api/blog/list') {
		return {
			msg: '获取博客列表的接口'
		}
	}
	if (method === 'GET' && req.path === '/api/blog/detail') {
		return {
			msg: '获取博客详情的接口'
		}
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
