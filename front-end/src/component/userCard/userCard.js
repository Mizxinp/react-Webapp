import React from 'react'
import { WingBlank,WhiteSpace,Card } from 'antd-mobile'
class  UserCard extends React.Component{
	render(){
		return(
			<WingBlank >
				<WhiteSpace />
					{
						this.props.userList.map(item=>(
							item.avatar&&<Card key={item.user} style={{marginTop:'20px'}}>
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