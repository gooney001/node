var util = function () {
	this.getNow = function () {
		var now = new Date()
		var year = now.getFullYear()
		var month = now.getMonth()
		var date = now.getDate()
		var hour = now.getHours()
		var minute = now.getMinutes()
		var second = now.getSeconds()
		
		return {
			time: now.getTime(),
			date: year + '-' + (month > 9 ? month : '0' + month) + '-' + (date > 9 ? date : '0' + date) + ' ' + (hour > 9 ? hour : '0' + hour) + ':' + (minute > 9 ? minute : '0' + minute)+':'+(second>9?second:'0'+second)
		}
	}
}
module.exports=util