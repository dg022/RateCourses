import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Form from './Form'

class ModalExampleCloseConfig extends Component {
  state = { open: false }

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

  }


  render() {

  
    const { open, closeOnEscape, closeOnDimmerClick } = this.state

    return (
      <div>
      
        <Button onClick={this.closeConfigShow(true, false)}>
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
          <Form Error={this.props.Error}  TextBook={this.props.TextBook} Difficulty={this.props.Difficulty} TakeAgain={this.props.TakeAgain}   About={this.props.About}/>
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
