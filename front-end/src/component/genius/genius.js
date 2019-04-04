import React from 'react'
import { WingBlank,WhiteSpace,Card } from 'antd-mobile'
import { connect } from 'react-redux'
import  { getList } from '../../redux/chat.redux'
import UserCard from '../userCard/userCard'

@connect(
	state=>state.chatuser,
	{getList}
)

class Genius extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[]
		}
	}
	componentDidMount(){
		/* axios.get('/user/list?type=genius')
			.then(res=>{
				this.setState({data:res.data.data})
			}) */
			this.props.getList('boss')
	}
	render(){
		console.info('p',this.props);
		
		return(
			<UserCard userList={this.props.userList}></UserCard>
			
		)
	}
}

export default Genius