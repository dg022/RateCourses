import React from 'react'
import {  Item } from 'semantic-ui-react'

import Avatar from 'react-avatar';
import './Review.css';
import ThumbsUp from './ThumbsUp.js';
import Edit from './Edit';
import Flag from './Flag'; 




function toNumberString(num) { 

  if (Number.isInteger(num)) { 
    return num + ".0"
  } else {
    return num.toString(); 
  }
}



               

class ItemExampleItems extends React.Component{

  state = {

    ron:false,
    ronFlag:false,
    id:this.props.list._id, 
    diff:this.props.list.difficulty,
    takeAgain:this.props.list.takeAgain,
    body:this.props.list.body,



  }

  render(){


  const updateState = (obj)=>{

    this.setState({diff:obj.difficulty})
    this.setState({body:obj.body})
    this.setState({takeAgain:obj.takeAgain})
    console.log("this was hit")

  }

   const handleHover = () => {
    this.setState({ron:true})
  }

  const handleHoverFlag = () => {
    this.setState({ronFlag:true})
  }

  const handleLeave = () => {
    this.setState({ron:false})
  }
  const handleLeaveFlag = () => {
    this.setState({ronFlag:false})
  }

  var reviewID = "";

  if(this.state.diff>=1 &&  this.state.diff<= 2.5 ){

    this.reviewID ="A"


  }

  if(this.state.diff>=2.5 &&  this.state.diff<= 3.5 ){

    this.reviewID ="A1"


  }


  if(this.state.diff>=4.0 ){

    this.reviewID ="A2"


  }


if(this.state.diff!=null){
 
  return(

      <div   id="ir" class="item">
      
            <div class="image">

            <div class=" sb-avatar sb-avatar--icon" id={this.reviewID}>
              <div id="B" class=" sb-avatar__text">
              <span id="C"><span>{toNumberString(this.state.diff)}</span></span></div></div>
            </div>
            <div class="content">

              <div class="meta">
                <span>DifficultyS:{toNumberString(this.state.diff)}</span>
              </div>
              <div class="meta"> 
                <span>Would Take Again:{this.state.takeAgain}</span>
              </div>
              <div id ="it" class="description">
                <p>
                {this.state.body} 
                </p>
              </div>
             
              <ThumbsUp  id = {this.props.list._id}  decrementDB={this.props.decrementDB} incrementDB={this.props.incrementDB}  ThumbsUp={this.props.list.thumbsUp}  ThumbsDown={this.props.list.thumbsDown}   />
            </div>

            



        <div onMouseLeave={handleLeaveFlag} onMouseEnter={handleHoverFlag}>
        
        <Flag   on={this.state.ronFlag} />


        </div>

            <div onMouseLeave={handleLeave} onMouseEnter={handleHover}>
        
            <Edit   updateState={updateState} data={this.props.list}    id={this.props.list._id}Title={this.props.Title} on={this.state.ron}  courseTitle={this.props.list} />


            </div>

          



    </div>


  );
}
if(this.props.list.difficulty==null){



}


return(<div></div>)


}
}




export default ItemExampleItems
