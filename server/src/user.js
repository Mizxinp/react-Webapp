const express = require('express');
const utility = require('utility')
const Router = express.Router();
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const _filter = {pwd:0,__v:0}


Router.get('/list',function(req,res){
	// User.remove({},function(e,d){})
	const {type} = req.query;
	User.find({type},function(err,doc){
		return res.json({code:0,data:doc})
	})
})
Router.get('/info',function(req,res){
	const { user_id } = req.cookies
	if(!user_id){
		return res.json({code:1})
	}
	User.findOne({_id:user_id},_filter,function(err,doc){
		if(err){
			return res.json({code:1,msg:'服务端出错了'})
		}else{
			return res.json({code:0,data:doc})
		}
	})
})

//注册
Router.post('/register',function(req,res){
	
	const {user,pwd,type} = req.body;
	
	User.findOne({user:user},function(err,doc){
		console.log('doc',doc);
		
		if(doc){
			return res.json({
				code:1,
				msg:'用户名重复'
			})
		}
		new User({user,pwd:md5Pwd(pwd),type}).save(function(err,doc){
			if(err){
				return res.json({code:1,msg:'后端出错'})
			}
			const {user, type, _id} = doc
			res.cookie('user_id', _id)
			return res.json({code:0,data:{user, type, _id}})
		})
		
	})
})

// 登录
Router.post('/login',function(req,res){
	const { user,pwd } = req.body;
	User.findOne({user,pwd:md5Pwd(pwd)},{pwd:0},function(err,doc){
		if(err){
			res.json({code:1,msg:'用户名或者密码错误'})
		}else{
			res.cookie('user_id',doc._id)
			res.json({code:0,data:doc})
		}
	})
})

// 密码加密
function md5Pwd(pwd){
	let temp = 'mdg_ha_he!@jfsfjsl3455HHFET~~'
	return utility.md5(utility.md5(pwd+temp))
}

// 保存boss的相关招聘信息
Router.post('/update',function(req,res){
	const user_id = req.cookies.user_id
	if(!user_id){
		return json.dumps({code:1})
	}
	User.findByIdAndUpdate(user_id,req.body,function(err,doc){
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type	
		},req.body)
		return res.json({code:0,data})
	})
})

// 获取消息列表
Router.get('/getmsglist',function(req,res){
	const user = req.cookies.userName

	User.find({},function(err,userdoc){
		let users = {}
		userdoc.forEach(item=>{
			users[item._id] = {name:item.user,avatar:item.avatar}
		})
		Chat.find({},function(err,doc){
			if(!err){
				return res.json({code:0,msgs:doc,users:users})
			}
		})
	})
	
})

Router.post('/readmsg',function(req,res){
	const userid = req.cookies.user_id
	const {from} = req.body
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},
		function(err,doc){
			if(!err){
				return res.json({code:0,num:doc.nModified})
			}
			return res.json({code:1,msg:'修改失败'})
		}
	)
	
})
module.exports = Router