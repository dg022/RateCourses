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
      queried:false, 
      open: false,
      message:false,
      code:"",
      tbval:this.props.data.isTextBook,
      eval:this.props.data.email,
      dval:this.props.data.difficulty,
      taval:this.props.takeAgain, 
      aval:this.props.data.body,
      uval:this.props.data.useful,
      up:this.props.data.thumbsUp,
      down:this.props.data.thumbsDown,
      id:this.props.data.publicid,
      error:0, 
      sent:false,
      Profanity:false,
      


}






email = (e) =>{

  this.setState({eval:e})

}

TextBook = (term) =>{

    this.setState({tbval:term})
}


useful = (term) =>{

  this.setState({uval:term})
}

Difficulty= (term) =>{

    this.setState({dval:term})
}

TakeAgain= (term) =>{

    this.setState({taval:term})
}

About= (term) =>{

    this.setState({aval:term})
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


  send = async () =>{


    
    var profanity =  swearjar.profane(this.state.aval); 
    this.setState({Profanity:profanity})

    if(this.state.aval.length > 600){
      this.setState({error:1})
    }

    if(this.state.aval.length <=600 ){
      this.setState({error:0})
    }


    console.log(this.state.Profanity)
    console.log(profanity)


    this.setState({
      Profanity:profanity,
      error: this.state.aval.length > 600?1:0
  }, () => {
    if(!this.state.Profanity && this.state.error==0){
      const list = {
        "body": this.state.aval,
        "difficulty":this.state.dval,
        "takeAgain":this.state.taval,
        "isTextBook":this.state.tbval,
        "thumbsUp":this.state.up,
        "thumbsDown":this.state.down,
        "useful":this.state.uval,
      };
    


      this.sendEdit(list)
      console.log("this happened")
      this.props.updateState(list)
     
  
     this.close()
    }


  });






  }


  sendEdit =  async (list) => {


    let res = await axios.get('/edit', {
      params: {
        courseTitle: this.props.Title,
        review:list, 
        publicid:this.props.data.publicid
    
      }

  
    });



  }


  

  


  SendEmail = async () => {
  
 
  
    let res = await axios.get('/findid', {
      params: {
        courseTitle: this.props.Title,
        id:this.props.data.publicid
    }});

    
    this.setState({sent:true})
    


  }
  

  close = () => this.setState({ open: false, message:false, error:0, sent:false})
  Submitclose = async () => {
  


 // Right here. this is the issue, here you need to use this.state.code 
 //make a call to the database, to chec

 let res = await axios.get('/checkCode', {
  params: {
    courseTitle: this.props.Title,
    userEnteredid:this.state.code,
    publicid:this.props.data.publicid
}});

  if(res.data==true){
  this.setState({ message:true })
  }else{

    
    this.setState({error:1})


  }

  
 
  }

  renderButton=()=>{
    if(this.state.sent){
      return;
    }


    if(this.state.message){

        return(
            <Modal.Actions>

      <Button
        onClick={this.send}
        positive
        labelPosition='right'
        icon='checkmark'
        content='Submit'
        />
              
        </Modal.Actions>
            );

    }

    if(!this.state.message){
        return(
        <Modal.Actions>
        <center>
        <Button
        id="SWAG"
        onClick={this.Submitclose}
        positive
        labelPosition='right'
        icon='checkmark'
        content='Submit'
        
        />
    
    <Button
        onClick={this.SendEmail}
        id="SWAG"
        yellow
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


  
    
                <Forms 
                tbval={this.props.data.isTextBook} 
                dval={this.props.data.difficulty} 
                taval={this.props.data.takeAgain}
                eval={this.props.data.email}
                aval={this.props.data.body} 
                uval={this.props.data.useful}
                email={this.email}
                useful={this.useful}
                TextBook={this.TextBook}
                Difficulty={this.Difficulty} 
                TakeAgain={this.TakeAgain}
                About={this.About}
                Profanity={this.state.Profanity}
                Error={this.state.error}
                ResetProfanity={this.ResetProfanity}
                />
    
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

    return (

                <div>
                    <i onClick={this.closeConfigShow(false, true)}   class="pencil alternate icon large"></i>
                
                    <Modal className="edit"
                    size={"tiny"}
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                    >
                    <Modal.Header>  <center> Edit Post: Provide Edit Code! </center> </Modal.Header>
                   {this.renderModal()}
                
                   {this.renderButton()}

                    </Modal>

                </div>
                )
            }

                return(


                    
      <i class=" large pen square  icon large "></i>
                );
  }
}

export default ModalExampleCloseConfig
