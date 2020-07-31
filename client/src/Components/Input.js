import React from 'react'
import { Input } from 'semantic-ui-react'
import "./Review.css";

class InputExampleIcon  extends React.Component {


  state={

    error:0

  }

     change = (event) =>{
        this.props.codeChange(event.target.value)
      }

      
      shouldComponentUpdate(nextProps){

        
        return nextProps.error !== this.state.error;
        
    }

    componentDidUpdate(props){
      // Desired operations: ex setting state
      console.log(props.error)
    this.setState({error: props.error})
    console.log(this.state.error)


  }
    


render(){


      if(this.state.error==1){

return(

<Input  className ="yolo" icon='code' onChange={this.change} placeholder='Enter Code...' />

);

}


return(

<Input    icon='code' onChange={this.change} placeholder='Enter Code...' />

); 

}
}

export default InputExampleIcon 