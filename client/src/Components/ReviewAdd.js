import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import Form from "./Form.js"

const ModalModalExample = () => (
  <Modal trigger={<Button>Show Modal</Button>}>

    <Modal.Header>  <center> Add a Review!  </center></Modal.Header>
    <Modal.Content image>
      <Modal.Description>


    <Form/>

      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default ModalModalExample;
