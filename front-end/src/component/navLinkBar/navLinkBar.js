import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
	state=>state.chat
)
class NavLinkBar extends React.Component{
	render(){
		const navList = this.props.data.filter(item=>!item.hide)
		const {pathname} = this.props.location
		
		return(
			<TabBar>
				{
					navList.map(item=>(
						<TabBar.Item
							badge={item.path == '/msg'&&this.props.unread}
							key={item.path}
							title={item.text}
							icon={{uri:require(`./img/${item.icon}.png`)}}
							selectedIcon={{uri: require(`./img/${item.icon}-active.png`)}}
							selected={pathname === item.path}
							onPress={()=>{
								this.props.history.push(item.path)
							}}
						>

						</TabBar.Item>
					))
				}
			</TabBar>
		)
	}
}

export default NavLinkBar