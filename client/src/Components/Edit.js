import React, { Component } from 'react'
import { Button, Modal, TextArea, Form } from 'semantic-ui-react'
import Input from "./Input"
import "./Edit.css";
import axios from "axios"
import Forms from "./Form"

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
      up:this.props.data.thumbsUp,
      down:this.props.data.thumbsDown,
      id:this.props.id,
      error:0


}






email = (e) =>{

  this.setState({eval:e})

}

TextBook = (term) =>{

    this.setState({tbval:term})
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


  send = async () =>{

    const list = {
      "body": this.state.aval,
      "email":this.state.eval,
      "difficulty":this.state.dval,
      "takeAgain":this.state.taval,
      "isTextBook":this.state.tbval,
      "thumbsUp":this.state.up,
      "thumbsDown":this.state.down
    };
  



    let res = await axios.get('/edit', {
      params: {
        courseTitle: this.props.Title,
        review:list, 
        id:this.state.id
      }

  
    }
    
    );
     
    console.log("this happened")
    this.props.updateState(list)
   

   this.close()




  }


  //SendEmail =  async () => {

    // here you want to query the database, to send an email

    //let res = await axios.get('/findid', {
      //params: {
      //  courseTitle: this.props.Title,
    //    id:this.state.id
      
  
  //  }

  
    
  //}
  

  
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

  SendEmail = async () => {
  
 
  
    let res = await axios.get('/findid', {
      params: {
        courseTitle: this.props.Title,
        id:this.state.id
    }});


    const templateId = 'template_swHMraBb';
    this.sendFeedback(templateId, {message_html: this.state.id, from_name: "David", reply_to: res.data})


    // Here you need to send some kind of message, so that it says "email sent sucessfully"



  }
  

  close = () => this.setState({ open: false, message:false, error:0})
  Submitclose = async () => {
  
 
  if(this.state.code == this.props.id){
  this.setState({ message:true })
  }else{

    // Here you need to add logic to make it display some kind of error
    //
    this.setState({error:1})


  }

  
 
  }

  renderButton=()=>{

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
              
        <Button
        onClick={this.Submitclose}
        positive
        labelPosition='right'
        icon='checkmark'
        content='Submit'
        />
    
    <Button
        onClick={this.SendEmail}
        yellow
        labelPosition='right'
        icon='question circle outline'
        content='Forgot Code?'
        />

  


    </Modal.Actions>
        );
    }

    


  }



  renderModal =  () =>{

    if(this.state.message){

     

      return(


            <Modal.Content>


  
    
                <Forms 
                tbval={this.props.data.isTextBook} 
                dval={this.props.data.difficulty} 
                taval={this.props.data.takeAgain} 
                aval={this.props.data.body} 
                email={this.email}
                TextBook={this.TextBook}
                Difficulty={this.Difficulty} 
                TakeAgain={this.TakeAgain}
                About={this.About}
                />
    
            </Modal.Content>
    
    
        );

    }



    if(this.state.open){
    return(

        <Modal.Content>

        <Form>

        <center>
        <Input  error={this.state.error }codeChange={this.codeChange}/>
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
