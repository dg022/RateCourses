import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import Feedback from './Feedback'
function ModalExampleModal() {
  const [open, setOpen] = React.useState(false)

  var count = 0
 function logic() {
    if(document.querySelector('#feedbackinput')!=null ){
      
      console.log("hey")
      return document.querySelector('#feedbackinput').value.length; 
  
    }else{
      console.log("hey")
     return '';
    }
  
  
   }


  const SendEmail = (message)=> {
    
    let ses = await axios.get('/sendFeedBack', {
      params: {
        resp:message
    }});
  

  }

  return (

    <Modal
      size={"tiny"}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Provide Feedback!</Button>}
    >
      <Modal.Header>Provide Feedback!</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          <Header>Tell us what you thought!</Header>
          <center> 
            <div>
          
              
  <left> <h3 id="count"> 0/200  Characters</h3></left>
              <div class="ui fluid icon input">
              <input onChange={(e)=> document.querySelector('#count').innerText = e.target.value.length.toString()+"/200 Characters" } id="feedbackinput"  type="text" placeholder="Enter FeedBack..."/>
            
              </div>
              
          
        
            </div>
			</center>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
     <center> 
        <Button
          content="Submit!"
          labelPosition='right'
          icon='checkmark'
          onClick={() => 
            
          
            {
              
              if(document.querySelector('#feedbackinput').value.length > 200 ){
                document.querySelector('#count').style.color = "red";

              }else{
                setOpen(false)
                SendEmail(document.querySelector('#feedbackinput').value)

              }
              


           
          }
            
          
          }


          positive
        />
        </center>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal