import React, { Component } from 'react'
import { Button, Modal, TextArea, Form } from 'semantic-ui-react'

class ModalExampleCloseConfig extends Component {
  state = { 
      open: false,
      message:false,
      msg:""

}

    change = (event) => {

        this.setState({msg:event.target.value + ":" + this.props.title + ":" + this.props.body})
        

    }




  sendFeedback (templateId, variables) {
	window.emailjs.send(
  	'gmail', templateId,
  	variables
  	).then(res => {
    	console.log('Email successfully sent!')
  	})
  	// Handle errors here however you like, or use a React error boundary
  	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }




  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  close = () => this.setState({ open: false, message:false})
  Submitclose = () => {
  
 
  this.setState({ message:true })
  const templateId = 'template_swHMraBb';
  this.sendFeedback(templateId, {message_html: this.state.msg, from_name: this.state.name, reply_to: "david.george.2480@gmail.com"})



  }






  renderButton=()=>{

    if(this.state.message){

        return(
            <Modal.Actions>
        </Modal.Actions>
            );

    }

    if(!this.state.message){
        return(
        <Modal.Actions>
                    
        <Button
        onClick={this.Submitclose}
        positive
        labelPosition='right'
        icon='checkmark'
        content='Submit'
        />
    </Modal.Actions>
        );
    }

    


  }

  renderModal = () =>{

    if(this.state.message){

        return(


            <Modal.Content>
    
                Thank you for letting us know, we will take a look. 
    
            </Modal.Content>
    
    
        );

    }



    if(this.state.open){
    return(

        <Modal.Content>

        <Form>

        <Form.Field
         
            control={TextArea}
            onChange={this.change}
        
            placeholder='What was inappropriate about this post?'
        />
        </Form>

        </Modal.Content>



    );
    }

   

  }

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state

    



    if(this.props.on == true){

    return (

                <div>
                    <i onClick={this.closeConfigShow(false, true)}   class=" large flag outline icon"></i>
                
                    <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                    >
                    <Modal.Header>Report this post</Modal.Header>
                   {this.renderModal()}
                
                   {this.renderButton()}

                    </Modal>

                </div>
                )
            }

                return(


                    
    <i class=" large flag icon"></i>
                );
  }
}

export default ModalExampleCloseConfig