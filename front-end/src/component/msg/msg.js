import React  from 'react'
import { connect } from 'react-redux'
import { List,Badge } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

@connect(
	state=>state
)

class Msg extends React.Component{
	getLast = (arr) => {
		return arr[arr.length-1]
	}
	render(){
		const { chat: {chatmsg}} = this.props
		const userid = this.props.user._id
		const userinfo = this.props.chat.users
		
		console.log('props',this.props);
		const msgGrounp = {}
		chatmsg.forEach(item => {
			msgGrounp[item.chatid] = msgGrounp[item.chatid] || []
			msgGrounp[item.chatid].push(item)
		});
		

		const chatList  = Object.values(msgGrounp).sort((a,b)=>{
			const a_last = this.getLast(a).create_time
			const b_last = this.getLast(b).create_time
			console.log('大小',a_last);
			console.log('大小',b_last);
			
			return b_last - a_last
		})
		console.log('ha',chatList);
		return(
			<div>
					{chatList.map(item=>{
						const lastItem = this.getLast(item)
						const targetId = item[0].from==userid?item[0].to:item[0].from
						const unreadNum = item.filter(ele=>!ele.read && ele.to == userid).length
						return (
							<List key={lastItem._id}>
								<Item
									extra={<Badge text={unreadNum}></Badge>}
									thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
									arrow='horizontal'
									onClick={()=>{
										this.props.history.push(`/chat/${targetId}`)
									}}
								>
									{lastItem.content}
                	<Brief>{userinfo[targetId].name}</Brief>
								</Item>
							</List>
						)
					})}
			</div>
		)
	}
}

export default Msg