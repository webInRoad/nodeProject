class BaseModal {
	constructor(data, message) {
		// 场景：只传递一个参数，而这个参数实际上是个 message 信息
		if (typeof data === 'string') {
			this.message = data
			data = null
			message = null
		}
		if (data) {
			this.data = data
		}
		if (message) {
			this.message = message
		}
	}
}
class SuccessModal extends BaseModal {
	constructor(data, message) {
		super(data, message)
		this.errno = 0
	}
}
class ErrorModal extends BaseModal {
	constructor(data, message) {
		super(data, message)
		this.errno = -1
	}
}
module.exports = {
	SuccessModal,
	ErrorModal
}
