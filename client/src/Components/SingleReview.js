import React from 'react'
import {  Item } from 'semantic-ui-react'

const ItemExampleItems = (props) => (

  <div class="ui  item segment raised">
<div class="image">

</div>
<div class="content">

  <div class="meta">
    <span>Difficulty:{props.list.difficulty}</span>
  </div>
  <div class="meta">
    <span>Would Take Again:{props.list.takeAgain}</span>
  </div>
  <div class="description">
    <p>
    {props.list.body} 

    </p>
  </div>
  <div class="extra">
    Additional Details
  </div>
</div>
</div>




)





export default ItemExampleItems
