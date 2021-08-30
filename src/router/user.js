const { login } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../model/resModal')

const handleUserRouter = (req, res) => {
	const method = req.method
	if (method === 'GET' && req.path === '/api/user/login') {
		// const { username, password } = req.body
		const { username, password } = req.query
		return login(username, password).then((data) => {
			if (data.username) {
				// 设置session
				req.session.username = data.username
				req.session.realname = data.realname
				return new SuccessModal()
			} else {
				return new ErrorModal('登录失败')
			}
		})
	}
	if (method === 'GET' && req.path === '/api/user/login-test') {
		if (req.session.username) {
			return Promise.resolve(
				new SuccessModal({
					session: req.session
				})
			)
		} else {
			return Promise.resolve(new ErrorModal('未登录'))
		}
	}
}
module.exports = handleUserRouter
