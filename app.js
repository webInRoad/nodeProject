const queryString = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) => {
	const promise = new Promise((resovle, reject) => {
		const method = req.method
		if (method !== 'POST') {
			resovle({})
			return
		}
		if (req.headers['content-type'] !== 'application/json') {
			resovle({})
			return
		}
		let reqData = ''
		req.on('data', (chunk) => {
			reqData += chunk.toString()
		})
		req.on('end', () => {
			if (!reqData) {
				resovle({})
				return
			}
			console.info(reqData, 'reqData')
			resovle(JSON.parse(reqData))
		})
	})
	return promise
}
const serverHandler = (req, res) => {
	res.setHeader('Content-type', 'application/json')

	// const resData = {
	// 	name: 'zhangsan',
	// 	env: process.env.NODE_ENV
	// }

	// res.end(JSON.stringify(resData))
	const url = req.url
	req.path = url.split('?')[0]

	// 解析参数
	req.query = queryString.parse(url.split('?')[1])

	getPostData(req).then((reqData) => {
		req.body = reqData
		// 处理 blog 路由
		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			blogResult.then((blogData) => {
				res.end(JSON.stringify(blogData))
			})
			return
		}
		// 处理 user 路由
		const userResult = handleUserRouter(req, res)
		if (userResult) {
			userResult.then((userData) => {
				res.end(JSON.stringify(userData))
			})
			return
		}
		res.writeHead(404, { 'Content-type': 'text/plain' })
		res.write('404 NOT FOUND')
		res.end()
	})
}
module.exports = serverHandler
