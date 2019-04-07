import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Result,List,WhiteSpace,Button,Modal} from 'antd-mobile'
import browserCookies  from 'browser-cookies'
import {logoutSubmit} from '../../redux/user'

const alert = Modal.alert
@connect(
	state=>state.user,
	{logoutSubmit}
)
class PersonalCenter extends React.Component{
	constructor(props){
		super(props)
		this.state={}
	}
	logout = ()=>{
		
		alert('注销', '确认退出登录?', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{ text: '确定', onPress: () => {
				browserCookies.erase('user_id')
				this.props.logoutSubmit()
			} },
		])
	}
	render(){
		console.log('th',this.props);
		
		const {avatar,user,type,company,title,desc,money,redirectTo} = this.props
		const Item = List.Item;
		const Brief = Item.Brief;
		console.log(user)
		return(
			user?<div>
				<Result
					img={<img src={require(`../img/${avatar}.png`)} style={{width:50}} alt=''/>}
					title={user}
					message={type==='boss'?company:null}
				/>

				<List renderHeader={()=>{'简介'}}>
					<Item multipleLine>
						{title}
						{desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
						{money?<Brief>薪资:{money}</Brief>:null}
					</Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<Item >
						<Button type='warning' onClick={this.logout}>退出登录</Button>
					</Item>
				</List>
			</div>:<Redirect to={redirectTo} />
		)
	}
}
export default PersonalCenter