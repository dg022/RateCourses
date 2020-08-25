import React, { Component } from 'react';

import Field from './Field';


class Feedback extends Component{

		state = {
			message: '',
		};

	
		sendFeedback =  (templateId, variables) => {
			window.emailjs.send(
			  'gmail', templateId,
			  variables
			  ).then(res => {
				console.log('Email successfully sent!')
			  })
			  // Handle errors here however you like, or use a React error boundary
			  .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
			}

		SendEmail = (message)=> {
			const templateId = 'template_swHMraBb';
			this.sendFeedback(templateId, {message_html: message, from_name: "David", reply_to: this.state.email})
		}

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

