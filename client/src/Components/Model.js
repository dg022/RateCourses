import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import Feedback from './Feedback'
function ModalExampleModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Provide Feedback!</Button>}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <Feedback/>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal