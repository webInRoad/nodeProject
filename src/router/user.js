const { login } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../model/resModal')

const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
	return d.toGMTString()
}
const handleUserRouter = (req, res) => {
	const method = req.method
	if (method === 'GET' && req.path === '/api/user/login') {
		// const { username, password } = req.body
		const { username, password } = req.query
		return login(username, password).then((flag) => {
			if (flag.username) {
				res.setHeader(
					'Set-cookie',
					`username=${username};path=/;httpOnly;expires=${getCookieExpires()}`
				)
				return new SuccessModal()
			} else {
				return new ErrorModal('登录失败')
			}
		})
	}
	if (method === 'GET' && req.path === '/api/user/login-test') {
		if (req.cookie.username) {
			return Promise.resolve(
				new SuccessModal({
					username: req.cookie.username
				})
			)
		} else {
			return Promise.resolve(new ErrorModal('未登录'))
		}
	}
}
module.exports = handleUserRouter
