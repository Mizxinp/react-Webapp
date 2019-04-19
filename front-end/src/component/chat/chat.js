import React from 'react'
import {List,InputItem,NavBar,Icon,Grid } from 'antd-mobile'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import { withRouter } from 'react-router-dom'
import { getChatId } from '../../util'

const socket = io('ws://localhost:8089')


@withRouter
@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg,readMsg}
)

class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			text:'',
			msg:[],
			showEmoji:false
		}
	}
	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
		// const to = this.props.match.params.user
		// console.log('t',to);
		
		// this.props.readMsg(to)
	}
	componentWillUnmount(){
		console.log('触发了');
		
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}
	handleSubmit = ()=>{
		const from = this.props.user._id
		const to = this.props.match.params.user
		
		const msg = this.state.text
		this.props.sendMsg({from,to,msg})
		this.setState({text:''})
	}
	// 处理grid组件中的bug
	fixCarousel(){
		setTimeout(function(){ 
				window.dispatchEvent(new Event('resize'))
		}, 0)
	}
	render(){
		console.log('props',this.props);
		const { chat } = this.props
		const { showEmoji,text } = this.state
		const userid = this.props.match.params.user
		const users = chat.users
		const emoji = '😁 😂 😃 😄 😅 😆 😇 😈 😉 😊 😋 😌 😍 😎 😏 😐 😒 😓 😔 😖 😘 😚 😜 😝 😞 😠 😡 😢 😣 😤 😥 😨 😩 😪 😫 😭 😰 😱 😲 😳 😵 😶 😷 😸 😹 😺 😻 😼 😽 😾 😿 🙀 🙅 🙆 🙇 🙈 🙉 🙊 🙋 🙌 🙍 🙎 🙏 🚀 🚃 🚄 🚅 🚇 🚉 🚌 🚏 🚑 🚒 🚓 🚕 🚗 🚙 🚚 🚢 🚤 🚥 🚧 🚨 🚩 🚪 🚫 🚬 🚭 🚲 🚶 🚹 🚺 🚻 🚼 🚽 🚾 🛀 '
                      .split(" ")
                      .filter(v=>v)
											.map(v=>({text:v}));
		
		if(!users[userid]){
			return null
		}
		const chatid = getChatId(userid,this.props.user._id)
		const chatmsgs = chat.chatmsg.filter(item=>item.chatid==chatid)
		return(
			<div className='chat-page'>
				<NavBar
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.goBack()}
				>
					{users[userid].name}
				</NavBar>
				{chatmsgs.map(msg=>{
					const avatar = require(`../img/${users[msg.from].avatar}.png`)
					return msg.from == userid?(
						<List key={msg._id}>
							<List.Item
								thumb={avatar}
							>
								{msg.content}
							</List.Item>
						</List>
					):(
						<List key={msg._id}>
							<List.Item 
								className='chat-me'
								extra={<img src={avatar} />}
							>{msg.content}</List.Item>
						</List>
					)
				})}
				<div className='stick-footer'>
					<List>
						<InputItem
							placeholder='请输入'
							value={this.state.text}
							onChange={content=>{this.setState({text:content})}}
							extra={
								<div>
									<span 
											style={{marginRight:15}}
											onClick={()=>{
												this.setState({showEmoji:!showEmoji})
												this.fixCarousel()
											}}
									>😃</span>
									<span onClick={this.handleSubmit}>发送</span>
								</div>
							}
						>
						</InputItem>
					</List>
					{
						showEmoji&&<Grid 
						data={emoji}
						columnNum = {9}
						carouselMaxRow = {4}
						isCarousel = {true}
						style={{touchAction:'none'}}	//处理滑动时报错
						onClick={
							(el)=>{
								this.setState({text:text+el.text})
							}
						}
					/>
					}
				</div>
			</div>
		)
	}
}
export default Chat