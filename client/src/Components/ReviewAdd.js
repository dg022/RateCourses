import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Form from './Form'
import './Review.css';

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

   insertAfter = (el, referenceNode) => {

    if(el!=null && referenceNode!=null){
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  }
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



 
  componentDidMount(){
    
    var newEl = document.querySelector('#but');
    var ref  = document.querySelector('#seg');
    this.insertAfter(newEl, ref);
    window.onresize = (event) =>{

      document.getElementsByTagName('canvas')[0].style.height = document.body.scrollHeight.toString()+"px"
      document.getElementsByTagName('canvas')[0].style.width = document.body.clientWidth.toString()+"px"
     
    }
    document.getElementsByTagName('canvas')[0].style.height = document.body.scrollHeight.toString()+"px"
    document.getElementsByTagName('canvas')[0].style.width = document.body.scrollWidth.toString()+"px"
    
  }

  
  render() {

   
  
    const { open, closeOnEscape, closeOnDimmerClick } = this.state

    console.log(this.props)

    return (
      <div>
      
        
        <div id="but" onClick={this.closeConfigShow(true, false)} class="ui huge  violet basic button">  Add a review! <i class="right arrow icon"></i></div> 

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
