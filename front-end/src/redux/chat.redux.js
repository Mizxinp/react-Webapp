import axios from 'axios'

const USER_LIST = 'USER_LIST'

const initState = {
	userList:[]
}
// reducer
export function chatuser(state=initState,action){
	switch(action.type){
		case USER_LIST:
			return {...state,userList:action.payload}
		default:
			return state
	}
}

// action
function userList(data){
	return {type:USER_LIST,payload:data}
}

// dispatch
export function getList(type){
	return dispatch=>{
		axios.get('/user/list?type='+type)
			.then(res=>{
				dispatch(userList(res.data.data))
			})
	}
}