import axios from 'axios'
import {getRedirectPath} from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState = {
	redirectTo:'',
	msg:'',
	user:'',
	// pwd:'',
	type:''
}

export function user(state=initState,action){
	switch(action.type){
		case AUTH_SUCCESS:
			return { ...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
		case LOAD_DATA:
			return {...state,...action.payload}
		case LOGOUT:
			return { ...initState,redirectTo:'/login'}
		case ERROR_MSG:
			return { ...state,msg:action.msg,isAuth:false}
		default:
			return state
	}
}

function authSuccess(data){
	return { type:AUTH_SUCCESS,payload:data}
}

function errorMsg(msg){
	return { msg, type:ERROR_MSG}
}



export function login({user,pwd}){
	if(!user || !pwd){
		return errorMsg('用户名或密码错误')
	}
	return dispatch=>{
		axios.post('/user/login',{user,pwd}).then(res=>{
			if(res.status === 200 && res.data.code === 0){
				dispatch(authSuccess(res.data.data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function register({user,pwd,repeatpwd,type}){
	if(!user || !pwd || !type){
		return errorMsg('用户名密码必须输入')
	}
	if( pwd != repeatpwd ){
		return errorMsg('两次输入密码不一致')
	}
	return dispatch=>{
		axios.post('/user/register',{user,pwd,type}).then(res=>{
			console.log('res',res);
			
			if(res.status === 200 && res.data.code ===0){
				dispatch(authSuccess({user,pwd,type}))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function loadData(userInfo){
	return {type:LOAD_DATA,payload:userInfo}
}

export function update(data){
	return dispatch=>{
		axios.post('/user/update',data).then(res=>{
			if(res.status === 200 && res.data.code ===0){
				dispatch(authSuccess(data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

//退出清空redux
export function logoutSubmit(){
	return dispatch=>{
		dispatch({type:LOGOUT})
	}
}