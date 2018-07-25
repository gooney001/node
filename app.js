var path = require('path'), express = require('express'),bodyParser = require('body-parser'), cryptoJS = require('crypto-js'),md5=require('md5');
var logger = require('morgan')
var routes = require('./routes/index');
var ejs = require('ejs')
var app = express();
var sub = express();
//设置环境变量
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname,'public')))//可以访问此路径下的资源
app.use(bodyParser.json());//可以从body取值，否则undefined
app.use(bodyParser.urlencoded({ extended: false }))


app.use(logger('dev'))
//app.use(app.router)

// 设置请求头
// application/json  接口返回json数据
// charset=utf-8 解决json数据中中文乱码
app.use('*', function (req, res, next) {
    res.header('Content-Type','application/json;charset=utf-8');
    next();
});
app.use('/', routes)

app.get('/nonce', function (req,res) {
    var echostr = req.query.echostr;
    res.send(echostr);
})
app.get('/weixin', function (req,res) {
    var token = 'weixin';
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    var sign = cryptoJS.HmacSHA1("123weixin123456", "").toString();
    var md5Str = md5("123weixin123456");
    var response = {
        'sign': sign,
        'echostr': echostr,
        'signature': req.query.signature,
        'timestamp': timestamp,
        'nonce': nonce,
        'token': token,
        'md5Str': md5Str
    };
    
    res.send(JSON.stringify(response));
})
sub.on('mount', function (parent) {
    console.log('Admin Mounted');
    console.log(parent);
})
app.get('/', function (req, res) {
    console.log('/');
    res.send(JSON.stringify({ msg: 'Hello World!!'}));
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})
var server = app.listen(process.env.PORT||8092, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("访问地址http://%s:%s",host,port)
})
module.exports = app;

