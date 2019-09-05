const express = require('express')
const app = express()
var apiRoutes = express.Router();
app.use('/api',apiRoutes)

var appData = require('./public/data.json')

const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings



module.exports = {
  devServer: {
  //模拟数据开始
    before(app) {
      app.get('/api/seller', (req, res) => {
        res.json({
          // 这里是你的json内容
          errno: 0,
          data: seller
        })
      });
      app.get('/api/goods', (req, res) => {
        res.json({
          // 这里是你的json内容
          errno: 0,
          data: goods
        })
      });
      app.get('/api/ratings', (req, res) => {
        res.json({
          // 这里是你的json内容
          errno: 0,
          data: ratings
        })
      });
    },
   
    open: process.platform === 'darwin',
      host: '0.0.0.0',
      port: 8080,
      https: false,
      hotOnly: false,
      proxy: null// 设置代理
   
  },
}