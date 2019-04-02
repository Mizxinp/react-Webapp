const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/job')

mongoose.connection.on('connected',function(){
	console.log('mongodb connected success');
})
mongoose.connection.on('error',function(){
	console.log('mongodb connected error');
})
mongoose.connection.on('disconnected',function(){
	console.log('mongodb connected disconnected');
})

const Schema = mongoose.Schema;

const models = {
	user:{
		'user':{type:String, 'require':true},
		'pwd':{type:String, 'require':true},
		'type':{'type':String, 'require':true},
		'avatar':{'type':String},
		'desc':{'type':String},
		'title':{'type':String},
		'company':{'type':String},
		'money':{'type':String}
	},
	chat:{
	}
}

for(let m in models){
	mongoose.model(m,new Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}