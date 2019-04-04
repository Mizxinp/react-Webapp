import React from 'react'
import { connect } from 'react-redux'
import { Result,List,WhiteSpace,Button } from 'antd-mobile'

@connect(
	state=>state.user
)
class PersonalCenter extends React.Component{
	render(){
		console.log('th',this.props);
		
		const {avatar,user,type,company,title,desc,money} = this.props
		const Item = List.Item;
		const Brief = Item.Brief;
		console.log(user)
		return(
			user&&<div>
				<Result
					img={<img src={require(`../img/${avatar}.png`)} style={{width:50}} alt=''/>}
					title={user}
					message={type==='boss'?company:null}
				/>

				<List renderHeader={()=>{'简介'}}>
					<Item multipleLine>
						{title}
						{desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
						{money?<Brief>薪资:{money}</Brief>:null}
					</Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<Item >
						<Button type='warning'>退出登录</Button>
					</Item>
				</List>
			</div>
		)
	}
}
export default PersonalCenter