var http = require('../server/http')
var api = require('../server/api')
var config = require('../config/config').config
function show() {
    this.getInfo = function (req, res) {
        api.getUserInfo(req, res).then(function (data) {
            console.log(data)
            res.type('html')
            
            // 获取权限之后获取用户信息然后将首页展示给用户
            res.render('show', { name: data.info.nickname, img: data.info.headimgurl })
        })
    }
}
module.exports = show