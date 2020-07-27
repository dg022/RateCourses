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
      tbval:null,
      dval:null,
      taval:null, 
      aval:null,


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
        
        console.log(res); 
        this.setState({aval:res.data.body})
        this.setState({dval:res.data.difficulty})
        this.setState({taval:res.data.takeAgain})
        this.setState({tbval:res.data.isTextBook})

    }else{


        console.log("it does not exist within the database")
    }


    this.setState({queried:true})

  }

  renderModal =  () =>{

    if(this.state.message){

        if(!this.state.queried){
        this.searchCourse()
        }

        // here is where you have to do the reqeust
        // You need the courses title 


        return(


            <Modal.Content>
    
                <Forms 
                tbval={this.state.tbval} 
                dval={this.state.dval} 
                taval={this.state.taval} 
                aval={this.state.aval} 
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
