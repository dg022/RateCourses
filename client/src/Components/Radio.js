import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'

export default class RadioExampleRadioGroup extends Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
      <Form>
        <Form.Field>
          <Radio
            label='Yes '
            name='radioGroup'
            value='Yes '
            checked={this.state.value === 'Yes '}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
     
        <Radio
            label='No '
            name='radioGroup'
            value='No '
            checked={this.state.value === 'No '}
            onChange={this.handleChange}
          />
        </Form.Field>


      </Form>
    )
  }
}
