// 合并所有reducer 并且返回
import { combineReducers } from 'redux';
import { user } from './redux/user'
import { chatuser } from './redux/chatuser.redux'
import { chat } from './redux/chat.redux'

export default combineReducers({user,chatuser,chat})