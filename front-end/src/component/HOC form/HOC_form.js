import React from 'react'

export default function JobForm(Com){
	return class WrapperCom extends React.Component{
		constructor(props){
			super(props)
			this.state={}
		}
		handleChange = (key,val) =>{
			console.log('k',key);
			
			this.setState({
				[key]:val
			})
		}
		render(){
			return(
				<Com state={this.state} handleChange={this.handleChange} {...this.props}></Com>
			)
		}
	}
}