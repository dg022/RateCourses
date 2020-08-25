import React from 'react'
import { Button, Checkbox, Form,  TextArea, Message, Input, Icon  } from 'semantic-ui-react'
import Example from "./search";
import SearchCourse from "./DepartmentSearch"; 
import Scale from "./Scale"
import Radio from "./Radio"
import Email from "./EInput"
var swearjar = require('swearjar-extended');



class FormExampleForm extends React.Component {



  

  state={

    taval:this.props.taval,
    dval:this.props.dval,
    tbval:this.props.tbval,
    aval:this.props.aval,
    eval:this.props.eval,
    uval:this.props.uval,
    count:""
    

  }

  componentDidMount(){

    document.querySelector('#em').style.marginTop = "2%";
    
    


  }
  
   renderError = ()=>{

    if(this.props.Error!=1){
      return  <div></div>; 
    }else{


      return(
        <div> 
        <p>Make sure you fill out all the mandatory fields!</p>
        <p>Just in case, make sure your review is 600 characters or less</p>
        </div>

      )
    }


  }

  renderExistingEmail = ()=>{

    if(!this.props.EmailCheck){
      return  <div></div>; 
    }
    
    else{


      return(
        <p>Email already in use</p>

      )
    }


  }

   renderProfanity = ()=>{

    if(!this.props.Profanity){
      return  <div></div>; 
    }
    
    else{


      return(
        <p>Relax! No swearing.</p>

      )
    }


  }

    renderCorrectForm = ()=>{

    if(!this.props.properemail){
      return <div></div>; 
    }
    
    else{


      return(
        <p>Email is in incorrect form</p>

      )
    }


  }

  render(){

 const change = (event) =>{



    this.props.About(event.target.value)
    this.setState({aval:event.target.value})
    this.setState({count: event.target.value.length + "/600" + " Characters" })



  }  

  const Echange = (event) =>{


    this.props.email(event.target.value)
    this.setState({eval:event.target.value})


  }  



  const rendersMsg = () =>{

    if(this.props.Profanity || this.props.properemail || this.props.EmailCheck || this.props.Error==1){
      return(
        <Message negative>
        <Message.Header>Invalid Submission</Message.Header>
        {this.renderError()}
        {this.renderExistingEmail()}
        {this.renderProfanity()}
        {this.renderCorrectForm()}
    
      </Message>


      );
    }else{
      return <div></div>;
    }


    }


  

 

if(this.state.tbval!=null){
  return(
  <Form>

    <Form.Field>
   
      </Form.Field>
    <Form.Field>
    </Form.Field>
    <Form.Field>
    <Form.Field
            label='Would you would take the course again?'    
          />
  <Radio type={1} TakeAgain={this.props.TakeAgain}  taval={this.state.taval}    />

  <Form.Field
            label='Was the course useful?'    
          />
  <Radio type={2} useful={this.props.useful}  uval={this.state.uval}/>
 

</Form.Field>
<Form.Field
            label='How Easy was the course?'    
          />
      <Scale Difficulty={this.props.Difficulty} dval={this.state.dval}/>
      <Form.Field
            label='Did you actually use the textbook?'    
          />
      <Radio type={0} TextBook={this.props.TextBook} tbval={this.state.tbval} />


      



        


<Form.Field
            label={this.state.count}    
          />
     <Form.Field
          onChange={change}
          control={TextArea}
          label='About'
          value={this.state.aval}
        />
    <Form.Field>

      <Checkbox label='I am not a robot' />
    </Form.Field>
    {rendersMsg()}
  </Form>
  );
}

 

console.log(this.props)
  return(

  
  <Form>

    <Form.Field>
   
      </Form.Field>
    <Form.Field>
    </Form.Field>
    <Form.Field>
    <Form.Field
            label='Would you would take the course again?'    
          />
  <Radio type={1} TakeAgain={this.props.TakeAgain} />

  <Form.Field
            label='Was the course useful?'    
          />
  <Radio type={2} useful={this.props.useful} />
 

</Form.Field>
<Form.Field
            label='How Easy was the course?'    
          />
      <Scale Difficulty={this.props.Difficulty}/>
      <Form.Field
            label='Did you actually use the textbook?'    
          />
      <Radio type={0} TextBook={this.props.TextBook}  />
    
      <Input id="em" iconPosition='left' placeholder='Email'>
      <Icon name='at' />
      <input  onChange={Echange}  value={this.state.eval} />
    </Input>
 


<Form.Field
            label={this.state.count}    
          />

     <Form.Field
          onChange={change}
          control={TextArea}
          label='About'
          placeholder='What do you think about this course?'
        />
    <Form.Field>

      <Checkbox label='I am not a robot' />
    </Form.Field>
    {rendersMsg()}
  </Form>
  );
}
}

export default FormExampleForm
