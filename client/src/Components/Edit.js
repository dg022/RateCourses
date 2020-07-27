import React, { Component } from 'react'
import { Button, Modal, TextArea, Form } from 'semantic-ui-react'
import Input from "./Input"
import "./Edit.css";
import axios from "axios"

class ModalExampleCloseConfig extends Component {
  state = { 
      open: false,
      message:false,
      code:""

}


  codeChange  = (codeType) =>{

    this.setState({code:codeType})

  } 

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  close = () => this.setState({ open: false, message:false})
  Submitclose = async () => {
  
 
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


  searchCourse = async () => {

    
    let res = await axios.get('/searchCourse', {
        params: {
          Title: this.props.Title,
          id:this.state.code
        }
      });

    if(res.data!=""){
        console.log("the code the user has provided us exists within the database")
        console.log(res); 
        
    }else{


        console.log("it does not exist within the database")
    }



  }

  renderModal =  () =>{

    if(this.state.message){


        this.searchCourse()

        // here is where you have to do the reqeust
        // You need the courses title 


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

        <center>
        <Input  codeChange={this.codeChange}/>
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
