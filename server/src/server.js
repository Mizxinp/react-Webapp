const express = require('express');
const bodyParser = require('body-parser')	//处理post请求
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const app = express();

// Chat.remove({},function(e,d){})
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection',function(socket){
	// console.log('user login');
	socket.on('sendmsg',function(data){
		// console.log(data);
		const { from,to,msg } = data
		const chatid = [from,to].sort().join('_')
		const create_time = new Date().getTime()
		Chat.create({chatid,from,to,content:msg,create_time},function(err,doc){
			//发送全局的事件
			console.log('ha',doc._doc);
			
			io.emit('recvmsg',Object.assign({},doc._doc))
		})		
	})
})

const userRouter = require('./user');

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter);
server.listen(8089,function(){
	console.log('server start at port 8089')
})