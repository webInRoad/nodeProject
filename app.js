const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandler = (req, res) => {
	res.setHeader('Content-type', 'application/json')

	// const resData = {
	// 	name: 'zhangsan',
	// 	env: process.env.NODE_ENV
	// }

	// res.end(JSON.stringify(resData))
	const url = req.url
	req.path = url.split('?')[0]
	// 处理 blog 路由
	const blogData = handleBlogRouter(req, res)
	if (blogData) {
		res.end(JSON.stringify(blogData))
		return
	}
	// 处理 user 路由
	const userData = handleUserRouter(req, res)
	if (userData) {
		res.end(JSON.stringify(userData))
		return
	}
	res.writeHead(404, { 'Content-type': 'text/plain' })
	res.write('404 NOT FOUND')
	res.end()
}
module.exports = serverHandler
