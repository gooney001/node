var fs = require('fs')
var data=fs.readFileSync('input.txt')
console.log(data.toString())
fs.readFile('input.txt', function(err, data){
    if(err)return consolse.err(err)
    console.log(data.toString())
})
console.log(__filename)
console.log(__dirname)
console.log('程序执行结束！')
var readerStream = fs.createReadStream('input.txt')
readerStream.setEncoding('UTF8')
var _data=''
readerStream.on('data', function (chunk) {
    _data += chunk
})
readerStream.on('end', function () {
    console.log(_data)
})
readerStream.on('error', function (err) {
    console.log(err.stack)
})
console.log('程序执行结束！')

var writeStream = fs.createWriteStream('output.txt')
readerStream.pipe(writeStream);
//writeStream.write('数据', 'UTF8')

writeStream.end()
writeStream.on('finish', function () {
    console.log('写入成功')
})
writeStream.on('error', function (err) {
    console.log(err.stack)
})

console.log('程序执行结束！')

var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);
