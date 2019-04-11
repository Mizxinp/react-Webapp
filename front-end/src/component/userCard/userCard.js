import React from 'react'
import { WingBlank,WhiteSpace,Card } from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class  UserCard extends React.Component{
	handleClick = (item)=>{
		this.props.history.push(`/chat/${item.user}`)
	}
	render(){
		return(
			<WingBlank >
				<WhiteSpace />
					{
						this.props.userList.map(item=>(
							item.avatar&&
							<Card 
								key={item.user} 
								style={{marginTop:'20px'}}
								onClick={()=>{this.handleClick(item)}}
							>
								<Card.Header
									title={item.user}
									thumb={require(`../img/${item.avatar}.png`)}
									extra={<span>{item.title}</span>}
								/>
								<Card.Body>
								{item.type === 'boss'?<div>公司：{item.company}</div>:null}
									{item.desc.split('\n').map(ele=>(
										<div key={ele}>{ele}</div>
									))}
									{item.type === 'boss'?<div>{item.money}</div>:null}
								</Card.Body>
							</Card>
						))
					}
				<WhiteSpace size="lg" />
			</WingBlank>
		)
	}
}

export default UserCard