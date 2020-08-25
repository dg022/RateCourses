import React, { Component } from 'react';

import Field from './Field';


class Feedback extends Component{

		state = {
			message: '',
		};

	
	

	

	render(){
		return(
			<center> 
			<div>
		
				<left> <h4> {this.state.message.length}/200 Characters </h4></left>

				<div class="ui fluid icon input">
				<input  value = {this.state.message}  onChange = {(event) => this.setState({'message': event.target.value})}  type="text" placeholder="Enter FeedBack..."/>
			
				</div>
				
		
	
			</div>
			</center>
		);
	}

}

export default Feedback;

