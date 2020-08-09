import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Form from './Form'

class ModalExampleCloseConfig extends Component {
  state = { 
    open: false,
    Profanity:this.props.Profanity
  
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  close = () => {
    
   
    this.props.SubmitForm()
  
  }

  componentWillReceiveProps =(nextProps)=>{

    if(nextProps.willClose ==1){
      this.setState({ open: false })
      nextProps.resetClose()
    }

    if(nextProps.Profanity == true){
      this.setState({Profanity:true })

    }

  }


  render() {

  
    const { open, closeOnEscape, closeOnDimmerClick } = this.state

    console.log(this.props)

    return (
      <div>
      
        <Button size='massive' onClick={this.closeConfigShow(true, false)}>
          Add a review!
        </Button>

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close} 
        >
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
          <Form Error={this.props.Error}
            Profanity={this.state.Profanity}   
            TextBook={this.props.TextBook} 
            Difficulty={this.props.Difficulty} 
            TakeAgain={this.props.TakeAgain}   
            About={this.props.About}
            email={this.props.email}
            useful={this.props.useful}
/>

          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={this.close}
              positive
              labelPosition='right'
              icon='checkmark'
              content='submit'
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalExampleCloseConfig
