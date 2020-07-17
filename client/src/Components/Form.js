import React from 'react'
import { Button, Checkbox, Form,  TextArea,Input  } from 'semantic-ui-react'
import Example from "./search";
import SearchCourse from "./DepartmentSearch"; 

const FormExampleForm = () => (
  <Form>
    <Form.Field>
      <label>Department</label>
      <SearchCourse/>
    </Form.Field>
    <Form.Field>
      <label>Course</label>
      <Example/>
    </Form.Field>
    <Form.Field
            control={Input}
            label='Course Review'
            placeholder='Enter a score out of 10'
          />
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
