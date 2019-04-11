import React from 'react'
import {List,InputItem} from 'antd-mobile'
import io from 'socket.io-client'

const socket = io('ws://localhost:8089')
socket.on('recvmsg',data=>{
	console.log('d',data);
	
})
class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			text:'',
			msg:[]
		}
	}
	componentDidMount(){

		socket.on('recvmsg',data=>{
			console.log('d',data);
			this.setState({
				msg:[...this.state.msg,data.text]
			})
		})
	}
	handleSubmit = ()=>{
		const {text} = this.state
		socket.emit('sendmsg',{text:text})
		this.setState({text:''})
	}
	render(){
		return(
			<div>
				{this.state.msg.map(msg=>{
					return <p key={msg}>{msg}</p>
				})}
				<div className='stick-footer'>
					<List>
						<InputItem
							placeholder='请输入'
							value={this.state.text}
							onChange={content=>{this.setState({text:content})}}
							extra={<span onClick={this.handleSubmit}>发送</span>}
						>
						</InputItem>
					</List>
				</div>
			</div>
		)
	}
}
export default Chat