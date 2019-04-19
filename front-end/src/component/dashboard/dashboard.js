import React  from 'react'
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Route } from 'react-router-dom'
import NavLinkBar from '../navLinkBar/navLinkBar'
import { user } from '../../redux/user';
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import PersonalCenter from '../PersonalCenter/PersonalCenter'
import Msg from '../msg/msg'
import {getMsgList,recvMsg} from '../../redux/chat.redux'

@connect(
	state=>state,
	{getMsgList,recvMsg}
)
class Dashboard extends React.Component{
	componentDidMount(){
		//防止多次获取
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
	}
	render(){
		const {pathname} = this.props.location
		
		const user = this.props.user
		const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide:user.type === 'genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Genius,
				hide:user.type ==='boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg

			},
			{
				path:'/personalcenter',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:PersonalCenter
			}
		]
		return(
			<div>
				<NavBar mode='dark'>{navList.find(item=>item.path === pathname).title}</NavBar>
				<div>
					{
						navList.map(item=>(
							<Route key={item.path} path={item.path} component={item.component}></Route>
						))
					}
				</div>
				<NavLinkBar data={navList}></NavLinkBar>
			</div>
		)
	}
}

export default Dashboard