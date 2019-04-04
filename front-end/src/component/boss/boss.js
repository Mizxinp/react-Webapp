import React from 'react'
import { connect } from 'react-redux'
import  { getList } from '../../redux/chat.redux'
import UserCard from '../userCard/userCard'

@connect(
	state=>state.chatuser,
	{getList}
)

class Boss extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[]
		}
	}
	componentDidMount(){
			this.props.getList('genius')
	}
	render(){
		return(
			<UserCard userList={this.props.userList}></UserCard>
		)
	}
}

export default Boss