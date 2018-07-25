var http=require('./http'),fs=require('fs'),path=require('path')
var config = require('../config/config').config
exports.getUserInfo = async function () {
    var tokenJsonPath = path.join(process.cwd() + '/config/token.json')
    var tokenInfo = {
        access_token: '',
        openId: '',
        info: {}
    }
    var isOk=true
    var tokenJson = JSON.parse(fs.readFileSync(tokenJsonPath, 'utf8'))
    var now = (new Date()).getTime()
    var times = (now - tokenJson.expirtime) / 1000 / 60
    console.log(times)
    if (times > 60 * 2) {
        isOk = false
        console.log('token.json存在，但是超时')
    } else {
        console.log('token.json存在，' + times.toString())
    }
    if (!tokenJson.access_token) {
        isOk = false
        console.log('access_token不存在')
    }
    console.log(isOk)
    if (isOk) {
        return {
            access_token: tokenJson.access_token,
            openId: tokenJson.openid,
            info: tokenJson.info
        } 
    }
    var requestToken = {
        appid: config.wechat.appID,
        secret: config.wechat.appsecret,
        grant_type: 'client_credential'
    }
    var token = await http.get('https://api.weixin.qq.com/cgi-bin/token', requestToken)
    console.log(requestToken)
    console.log(token)
    //用户信息
    var info = await http.get('https://api.weixin.qq.com/cgi-bin/user/info', {
        access_token: token.access_token,
        openid: token.openid,
        lang: 'zh_CN'
    })
    var utils = new require('../utils/util')
    var util = new utils();
    var _time = util.getNow()
    tokenInfo = {
        access_token: token.access_token,
        openId: token.openid,
        info: info,
        expirtime: _time.time ,
        expirdate: _time.date
    }
    fs.writeFile(tokenJsonPath, JSON.stringify(tokenInfo), function (err) {
        if (err) {
            console.error(err)
        }
    })
    return {
        access_token: token.access_token,
        openId: token.openid,
        info: info
    }
}