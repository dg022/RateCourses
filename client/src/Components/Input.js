import React from 'react'
import { Input } from 'semantic-ui-react'

const InputExampleIcon = (props) => {

    const change = (event) =>{
        props.codeChange(event.target.value)
      }

return(

<Input icon='code' onChange={change} placeholder='Enter Code...' />

); 

}

export default InputExampleIcon 