import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Form from './Form'
import './Review.css';

class ModalExampleCloseConfig extends Component {
  state = { 
    open: false,
    Profanity:this.props.Profanity,
    EmailCheck:this.props.EmailCheck
  
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  close = () => {
    
   console.log("attempting to submit the form")
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

    if(nextProps.EmailCheck == true){
      this.setState({EmailCheck:true })

    }

  }



 back = ()=>{

  this.props.back();

 }
  componentDidMount(){
    
    var newEl = document.querySelector('#but');
    var ref  = document.querySelector('#seg');
    this.insertAfter(newEl, ref);

    var newEl = document.querySelector('#beforebut');
    var ref  = document.querySelector('#but');
    this.insertAfter(newEl, ref);


    if(document.querySelector('#stat') == null){
      document.querySelector("#but").style.width = "100%"
      document.querySelector("#beforebut").style.width = "100%"

    }
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
      <div id="beforebut" onClick={this.closeConfigShow(true, false)} class="ui huge  white button">  Add  Review! <i class="right arrow icon"></i></div> 
      <div id="but"  onClick={this.back}  class="ui huge red button"> Back   <i class="left arrow icon"></i></div>
        

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close} 
        >
          <Modal.Header> Create Review</Modal.Header>
          <Modal.Content>
          <Form Error={this.props.Error}
            Profanity={this.props.Profanity}   
            EmailCheck={this.props.EmailCheck}
            TextBook={this.props.TextBook} 
            Difficulty={this.props.Difficulty} 
            TakeAgain={this.props.TakeAgain}   
            About={this.props.About}
            email={this.props.email}
            properemail={this.props.properemail}
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
