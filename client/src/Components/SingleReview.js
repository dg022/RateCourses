import React from 'react'
import {  Item } from 'semantic-ui-react'

import Avatar from 'react-avatar';
import './Review.css';
import ThumbsUp from './ThumbsUp.js';
 



function toNumberString(num) { 
  console.log(num)
  if (Number.isInteger(num)) { 
    return num + ".0"
  } else {
    return num.toString(); 
  }
}
  
     
               

const ItemExampleItems = (props) => {

  var reviewID = "";

  if(props.list.difficulty>=1 &&  props.list.difficulty<= 2.5 ){

    reviewID ="A"


  }

  if(props.list.difficulty>=2.5 &&  props.list.difficulty<= 3.5 ){

    reviewID ="A1"


  }


  if(props.list.difficulty>=4.0 ){

    reviewID ="A2"


  }


if(props.list.difficulty!=null){
  console.log(props.list)
  return(

      <div id="ir" class="item">
      
            <div class="image">

            <div class=" sb-avatar sb-avatar--icon" id={reviewID}>
              <div id="B" class=" sb-avatar__text">
              <span id="C"><span>{toNumberString(props.list.difficulty)}</span></span></div></div>
            </div>
            <div class="content">

              <div class="meta">
                <span>DifficultyS:{toNumberString(props.list.difficulty)}</span>
              </div>
              <div class="meta"> 
                <span>Would Take Again:{props.list.takeAgain}</span>
              </div>
              <div id ="it" class="description">
                <p>
                {props.list.body} 
                </p>
              </div>
             
              <ThumbsUp  id = {props.list._id}  decrementDB={props.decrementDB} incrementDB={props.incrementDB}  ThumbsUp={props.list.thumbsUp}  ThumbsDown={props.list.thumbsDown}   />
            </div>


  

    
    </div>

  );
}
if(props.list.difficulty==null){

  console.log(props.list)

}


return(<div></div>)


}





export default ItemExampleItems
