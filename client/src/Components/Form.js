import React from 'react'
import { Button, Checkbox, Form,  TextArea,Input  } from 'semantic-ui-react'
import Example from "./search";
import SearchCourse from "./DepartmentSearch"; 
import Scale from "./Scale"
import Radio from "./Radio"

const FormExampleForm = (props) => (
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
          control={TextArea}
          label='About'
          placeholder='What do you think about this course?'
        />
    <Form.Field>

      <Checkbox label='I am not a robot' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default FormExampleForm
