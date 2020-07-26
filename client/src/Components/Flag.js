import React, { Component } from 'react'
import { Button, Modal, TextArea, Form } from 'semantic-ui-react'

class ModalExampleCloseConfig extends Component {
  state = { 
      open: false,
      message:false

}



  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  close = () => this.setState({ open: false, message:false})
  Submitclose = () => {
  
 
  this.setState({ message:true })

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
