const { loginCheck } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../model/resModal')
const handleUserRouter = (req, res) => {
	const method = req.method
	if (method === 'POST' && req.path === '/api/user/login') {
		const { username, password } = req.body
		const flag = loginCheck(username, password)
		if (flag) {
			return new SuccessModal()
		} else {
			return new ErrorModal('登录失败')
		}
	}
}
module.exports = handleUserRouter
