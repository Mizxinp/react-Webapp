const express = require('express');
const bodyParser = require('body-parser')	//处理post请求
const cookieParser = require('cookie-parser')
const app = express();

const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection',function(socket){
	console.log('user login');
	socket.on('sendmsg',function(data){
		console.log(data);
		//发送全局的事件
		io.emit('recvmsg',data)
		
	})
})

const userRouter = require('./user');

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter);
server.listen(8089,function(){
	console.log('server start at port 8089')
})