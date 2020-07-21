import React from 'react'
import {  Item } from 'semantic-ui-react'

const ItemExampleItems = (props) => (


<div  style ={{width:'50%' }}class="ui raised  container segment">
  <h2 class="ui header">Difficulty:{props.list.difficulty} </h2>
  <h2 class="ui header">Would Take Again:{props.list.takeAgain} </h2>
  <p>
  {props.list.body} 
  </p>

</div>
)

export default ItemExampleItems
