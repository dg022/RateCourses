import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'

export default class RadioExampleRadioGroup extends Component {
  state = {}
  handleChange = (e, { value }) => {
      
    this.setState({ value })

    if (this.props.type ==1){
      
        this.props.TakeAgain(value)
    }

    if (this.props.type ==0){
        this.props.TextBook(value)
    }
}

componentWillReceiveProps(props, Props){

  if(props.taval=="Yes"){

    this.setState({value:"Yes"})

  }

  if(props.taval=="No"){
    this.setState({value:"No"})
    
  }


  if(props.tbval=="Yes"){
    this.setState({value:"Yes"})

  }

  if(props.tbval=="No"){
    this.setState({value:"No"})
    
  }

}



  render() {

    

    return (
      <Form>
        <Form.Field>
          <Radio
            label='Yes'
            name='radioGroup'
            value='Yes'
            checked={this.state.value === 'Yes'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
     
        <Radio
            label='No'
            name='radioGroup'
            value='No'
            checked={this.state.value === 'No'}
            onChange={this.handleChange}
          />
        </Form.Field>


      </Form>
    )
  }
}
