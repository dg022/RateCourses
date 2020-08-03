import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'

export default class RadioExampleRadioGroup extends Component {
  state = {}
  handleChange = (e, { value }) => {
      
    this.setState({ value })
    console.log(this.props)

    if (this.props.type ==1){
      
        this.props.TakeAgain(value)
    }

    if(this.props.type ==2){
      console.log(this.props)
      this.props.useful(value)
    }

    if (this.props.type ==0){
        this.props.TextBook(value)
    }
}

componentDidMount(){


  if(this.props.taval=="Yes"){
    console.log("this is being hit, regalrdess of what you try")
    this.setState({value:"Yes"})

  }

  if(this.props.taval=="No"){
    this.setState({value:"No"})
    
  }


  if(this.props.tbval=="Yes"){
    this.setState({value:"Yes"})

  }

  if(this.props.tbval=="No"){
    this.setState({value:"No"})
    
  }


  if(this.props.uval=="Yes"){
    this.setState({value:"Yes"})

  }

  if(this.props.uval=="No"){
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
