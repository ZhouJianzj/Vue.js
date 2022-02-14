const express = require('express')


//创建web服务器
const app = express()

//托管静态资源
app().use(express.static('./dist'))

app.listen(80,()=>{
    console.log("server start with host http:127.0.0.1")
})

