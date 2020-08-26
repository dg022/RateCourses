import React, { Component } from 'react'
import { Button, Modal, TextArea, Form } from 'semantic-ui-react'
import Input from "./Input"
import "./Edit.css";
import axios from "axios"
import Forms from "./Form"
var validator = require("email-validator");
var swearjar = require('swearjar-extended');

class ModalExampleCloseConfig extends Component {
  state = { 
      open: false,
      message:false,
      code:"",
      id:this.props.id,
      error:0, 
      send: false, 


}


  SendEmail = async () => {
  
 
  
    let res = await axios.get('/findid', {
      params: {
        courseTitle: this.props.Title,
        id:this.state.id
    }});
    
 
  
    this.setState({sent:true})
    // Here you need to send some kind of message, so that it says "email sent sucessfully"



  }





  codeChange  = (codeType) =>{

    this.setState({code:codeType})

  } 

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  ResetProfanity = () =>{

    this.setState({Profanity:false})

  }

  close = () => this.setState({ open: false, message:false, error:0,  sent:false})
  Submitclose =  async () => {
  
 
        if(this.state.code == this.props.id){
        this.setState({ message:true })
        // Here is where you want to send a respond
        
        let res = await axios.get('/delete', {
            params: {
              courseTitle: this.props.Title,
              id:this.state.id
          }});
         
          this.props.deleted();
        
         


        }else{

            // Here you need to add logic to make it display some kind of error
            this.setState({error:1})
        }
  }

  renderButton=()=>{
    if(this.state.sent){
      return;
    }

    if(this.state.message){
        // This is when the person put thir code, and it works, we dont need a button here
        return(
            <div></div>
        );
      

    }

    if(!this.state.message){
        return(
        <Modal.Actions>
        <center>
        <Button
        onClick={this.Submitclose}
        positive
        id="SWAG"
        labelPosition='right'
        icon='checkmark'
        content='Submit'
        />
    
    <Button
        onClick={this.SendEmail}
        yellow
        id="SWAG"
        labelPosition='right'
        icon='question circle outline'
        content='Forgot Code?'
        />
 </center> 
  


    </Modal.Actions>
        );
    }

    


  }



  renderModal =  () =>{
    if(this.state.sent){

      return(


        <Modal.Content>

        Your edit code has been sent to your email!

        </Modal.Content>


    );


    }




    if(this.state.message){

     

      return(


            <Modal.Content>
                    <Modal.Content>

                    Your post has been deleted 

                    </Modal.Content>
            </Modal.Content>
    
    
        );

    }



    if(this.state.open){
    return(

        <Modal.Content>

        <Form>

        <center>
        <Input  error={this.state.error } codeChange={this.codeChange}/>
        </center>
       

        </Form>

        </Modal.Content>



    );
    }

   

  }

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state

    



    if(this.props.on == true){



    return(

                <div>
                    <i onClick={this.closeConfigShow(false, true)}   class="  large trash alternate outline icon large"></i>
                
                    <Modal className="edit"
                     size={"tiny"}
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                    >
                    <Modal.Header>  <center> Delete Post: Provide Edit Code! </center> </Modal.Header>
                   {this.renderModal()}
                
                   {this.renderButton()}

                    </Modal>

                </div>
                );
            }

                return(

                   
                    
      <i class=" large trash alternate icon large  "></i>
                );
  }
}

export default ModalExampleCloseConfig
