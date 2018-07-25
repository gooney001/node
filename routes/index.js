var express = require('express')
var router = express.Router()
var axios = require('axios')
var responseShow = require('../controllers/show')
// 响应shop路由
router.get('/show', (req, res) => {
    console.log('show')
    res.render('show')
})

router.get('/response', (new responseShow()).getInfo)
module.exports=router
