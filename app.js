const queryString = require('querystring')
const { get, set } = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { access } = require('./src/utils/log')

// session数据
// const SESSION_DATA = {}

const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
	return d.toGMTString()
}

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
  access(`${req.method} -- ${req.url} -- ${req.headers["user-agent"]} -- ${Date.now()}`)
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

	// 解析 cookie
	req.cookie = {}
	const cookieStr = req.headers.cookie || ''
	cookieStr.split(';').forEach((cookie) => {
		if (!cookie) {
			return
		}
		const arr = cookie.split('=')
		req.cookie[arr[0].trim()] = arr[1].trim()
	})

	// 解析session
	// let needSetCookie = false
	// let userId = req.cookie.userid
	// console.info(SESSION_DATA[userId], 'SESSION_DATA[userId]')
	// if (userId) {
	// 	if (!SESSION_DATA[userId]) {
	// 		SESSION_DATA[userId] = {}
	// 	}
	// } else {
	// 	needSetCookie = true
	// 	userId = `${Date.now()}_${Math.random()}`
	// 	SESSION_DATA[userId] = {}
	// }
	// req.session = SESSION_DATA[userId]
	// console.info(req.session, 'req.session')
	let needSetCookie = false
	let userId = req.cookie.userid
	console.info(userId, 'userId')
	if (!userId) {
		needSetCookie = true
		userId = `${Date.now()}_${Math.random()}`
	}
	req.sessionId = userId
	get(req.sessionId)
		.then((sessionData) => {
			console.info(sessionData, 'sessionData')
			if (sessionData == null) {
				req.session = {}
			} else {
				req.session = sessionData
			}
			return getPostData(req)
		})
		.then((reqData) => {
			req.body = reqData
			// 处理 blog 路由
			const blogResult = handleBlogRouter(req, res)
			if (blogResult) {
				blogResult.then((blogData) => {
					if (needSetCookie) {
						res.setHeader(
							'Set-Cookie',
							`userid=${userId};path='/';httpOnly;expires=${getCookieExpires()}`
						)
					}
					res.end(JSON.stringify(blogData))
				})
				return
			}
			// 处理 user 路由
			const userResult = handleUserRouter(req, res)
			if (userResult) {
				userResult.then((userData) => {
					console.info(needSetCookie, 'needSetCookie')
					if (needSetCookie) {
						res.setHeader(
							'Set-Cookie',
							`userid=${userId};path='/';httpOnly;expires=${getCookieExpires()}`
						)
					}
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
