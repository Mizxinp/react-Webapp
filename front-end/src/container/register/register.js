import React from 'react'
import {List, InputItem,Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user'
import Logo from '../../component/logo/logo'
import '../../index.css'
const RadioItem = Radio.RadioItem

@connect(
	state=>state.user,
	{register}
)

class Register extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			user:'',
			pwd:'',
			repeatpwd:'',
			type:'genius' // 或者boss
		}

	}
	handleChange = (key,val)=>{
		this.setState({
			[key]:val
		})
	}
	handleRegister = () =>{
		this.props.register(this.state)
		console.info(this.state);
		
	}
	render(){
		console.log('prpps',this.props);
		
		return(
			<div>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<List>
					{this.props.msg?<p className='err-msg'>{this.props.msg}</p>:null}
					<InputItem
						onChange={value=>this.handleChange('user',value)}
					>用户名</InputItem>
					<WhiteSpace />
					<InputItem
						type='password'
						onChange={value=>this.handleChange('pwd',value)}
					>密码</InputItem>
					<WhiteSpace />
					<InputItem
						type='password'
						onChange={value=>this.handleChange('repeatpwd',value)}
					>确认密码</InputItem>
					<WhiteSpace />
					<RadioItem
						checked={this.state.type=='genius'}
						onChange={()=>this.handleChange('type','genius')}
					>
						牛人
					</RadioItem>
					<RadioItem
						checked={this.state.type=='boss'}
						onChange={()=>this.handleChange('type','boss')}
					>
						BOSS
					</RadioItem>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleRegister}>注册 </Button>
				</List>
			</div>
		)
	}
}

export default Register