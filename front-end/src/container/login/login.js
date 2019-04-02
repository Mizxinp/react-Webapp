import React from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {login} from '../../redux/user'
import Logo from '../../component/logo/logo'

@connect(
	state=>state.user,
	{login}
)
class Login extends React.Component{
	handleLogin = () =>{
		this.props.login(this.state)
	}
	register = () =>{
		this.props.history.push('/register')
	}

	handleChange = (key,val) =>{
		this.setState({
			[key]:val
		})
	}
	render(){
		return(
			<div>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<WingBlank>
					<List>
						<InputItem
							onChange={value=>this.handleChange('user',value)}
						>用户</InputItem>
						<WhiteSpace />
						<InputItem
							onChange={value=>this.handleChange('pwd',value)}
						>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button onClick={this.handleLogin} type='primary'>登录</Button>
					<WhiteSpace />
					<Button onClick={this.register} type='primary'>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login