import React from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {login} from '../../redux/user'
import Logo from '../../component/logo/logo'
import  JobForm  from '../../component/HOC form/HOC_form'

@connect(
	state=>state.user,
	{login}
)
@JobForm
class Login extends React.Component{
	
	handleLogin = () =>{
		this.props.login(this.props.state)
	}
	register = () =>{
		this.props.history.push('/register')
	}

	/* handleChange = (key,val) =>{
		this.setState({
			[key]:val
		})
	} */
	render(){
		const {redirectTo} = this.props
		return(
			<div>
				{redirectTo&&redirectTo!='/login'?<Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<WingBlank>
					<List>
						<InputItem
							onChange={value=>this.props.handleChange('user',value)}
						>用户</InputItem>
						<WhiteSpace />
						<InputItem
							type='password'
							onChange={value=>this.props.handleChange('pwd',value)}
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