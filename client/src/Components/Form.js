import React from 'react'
import { Button, Checkbox, Form,  TextArea, Input, Message  } from 'semantic-ui-react'
import Example from "./search";
import SearchCourse from "./DepartmentSearch"; 
import Scale from "./Scale"
import Radio from "./Radio"


const FormExampleForm = (props) => {

  const change = (event) =>{


    props.About(event.target.value)


  }

if(props.tbval!=null){

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
  <Radio type={1} TakeAgain={props.TakeAgain}  taval={props.taval}    />
 

</Form.Field>
<Form.Field
            label='How difficult was the course?'    
          />
      <Scale Difficulty={props.Difficulty} dval={props.dval}/>
      <Form.Field
            label='Did you actually use the textbook?'    
          />
      <Radio type={0} TextBook={props.TextBook} tbval={props.tbval} />

     <Form.Field
          onChange={change}
          control={TextArea}
          label='About'
          value={props.aval}
        />
    <Form.Field>

      <Checkbox label='I am not a robot' />
    </Form.Field>
    
  </Form>
  );








}

 
if(props.Error == 1){

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
    <Radio type={1} TakeAgain={props.TakeAgain} />
   
  
  </Form.Field>
  <Form.Field
              label='How easy was the course?'    
            />
        <Scale Difficulty={props.Difficulty}/>
        <Form.Field
              label='Did you actually use the textbook?'    
            />
        <Radio type={0} TextBook={props.TextBook}  />
  
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
  <Radio type={1} TakeAgain={props.TakeAgain} />
 

</Form.Field>
<Form.Field
            label='How difficult was the course?'    
          />
      <Scale Difficulty={props.Difficulty}/>
      <Form.Field
            label='Did you actually use the textbook?'    
          />
      <Radio type={0} TextBook={props.TextBook}  />

     <Form.Field
          onChange={change}
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

export default FormExampleForm
