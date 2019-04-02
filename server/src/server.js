const express = require('express');
const bodyParser = require('body-parser')	//处理post请求
const cookieParser = require('cookie-parser')

const userRouter = require('./user');

const app = express();

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter);
app.listen(8089,function(){
	console.log('server start at port 8089')
})