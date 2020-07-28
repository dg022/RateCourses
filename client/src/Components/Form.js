import React from 'react'
import { Button, Checkbox, Form,  TextArea, Input, Message  } from 'semantic-ui-react'
import Example from "./search";
import SearchCourse from "./DepartmentSearch"; 
import Scale from "./Scale"
import Radio from "./Radio"


class FormExampleForm extends React.Component {



  state={

    taval:this.props.taval,
    dval:this.props.dval,
    tbval:this.props.tbval,
    aval:this.props.aval,

  }

  render(){

 const change = (event) =>{


    this.props.About(event.target.value)
    this.setState({aval:event.target.value})


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
 

</Form.Field>
<Form.Field
            label='How difficult was the course?'    
          />
      <Scale Difficulty={this.props.Difficulty} dval={this.state.dval}/>
      <Form.Field
            label='Did you actually use the textbook?'    
          />
      <Radio type={0} TextBook={this.props.TextBook} tbval={this.state.tbval} />

     <Form.Field
          onChange={change}
          control={TextArea}
          label='About'
          value={this.state.aval}
        />
    <Form.Field>

      <Checkbox label='I am not a robot' />
    </Form.Field>
    
  </Form>
  );








}

 
if(this.props.Error == 1){

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
   
  
  </Form.Field>
  <Form.Field
              label='How easy was the course?'    
            />
        <Scale Difficulty={this.props.Difficulty}/>
        <Form.Field
              label='Did you actually use the textbook?'    
            />
        <Radio type={0} TextBook={this.props.TextBook}  />
  
       <Form.Field
            onChange={change}
            control={TextArea}
            label='About'
            placeholder='What do you think about this course?'
          />
      <Form.Field>
  
        <Checkbox label='I am not a robot' />
      </Form.Field>
  
      <Message negative>
      <Message.Header>Invalid Submission</Message.Header>
      <p>Make sure you fill out all the mandatory fields!</p>
    </Message>
    </Form>
    );

}


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
 

</Form.Field>
<Form.Field
            label='How difficult was the course?'    
          />
      <Scale Difficulty={this.props.Difficulty}/>
      <Form.Field
            label='Did you actually use the textbook?'    
          />
      <Radio type={0} TextBook={this.props.TextBook}  />

     <Form.Field
          onChange={this.change}
          control={TextArea}
          label='About'
          placeholder='What do you think about this course?'
        />
    <Form.Field>

      <Checkbox label='I am not a robot' />
    </Form.Field>
    
  </Form>
  );
}
}

export default FormExampleForm
