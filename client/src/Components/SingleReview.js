
import React from 'react'
import {  Item } from 'semantic-ui-react'

import Avatar from 'react-avatar';
import './Review.css';
import ThumbsUp from './ThumbsUp.js';
import Edit from './Edit';
import Flag from './Flag'; 
import Delete from './Delete'; 




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
    ronDelete:false,
    id:this.props.list.id, 
    diff:this.props.list.difficulty,
    takeAgain:this.props.list.takeAgain,
    body:this.props.list.body,
    email:this.props.list.email,
    TextBook:this.props.list.isTextBook,
    useful:this.props.list.useful,
    deleted:false
  



  }

  render(){


  const updateState = (obj)=>{

    this.setState({diff:obj.difficulty})
    this.setState({body:obj.body})
    this.setState({takeAgain:obj.takeAgain})
    this.setState({email:obj.email})
    this.setState({useful:obj.useful})

  }

  const deleted = ()=>{
    this.setState({deleted:true})
  }

   const handleHover = () => {
    this.setState({ron:true})
  }

  const handleHoverFlag = () => {
    this.setState({ronFlag:true})
  }

  const handleHoverDelete = () => {
    this.setState({ronDelete:true})
  }

  const handleLeave = () => {
    this.setState({ron:false})
  }
  const handleLeaveFlag = () => {
    this.setState({ronFlag:false})
  }

  const handleLeaveDelete = () => {
    this.setState({ronDelete:false})
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

if(this.state.deleted){
return(<div></div>);

}


if(this.state.diff!=null){
 
  return(

      <div   id="ir" class="item">
      
            <div class="image">

            <div class=" sb-avatar sb-avatar--icon" id={this.reviewID}>
              <div id="B" class=" sb-avatar__text">
              <span id="C"><span>{toNumberString(this.state.diff)}</span></span></div></div>
              <center> 
              <div  id="newgrid" class="ui grid">
        <div  class="four wide column">
            <div onMouseLeave={handleLeaveFlag} onMouseEnter={handleHoverFlag}>
            
            <Flag  body={this.state.body}  title={this.props.Title} on={this.state.ronFlag} />


            </div>
        </div>
        <div  class="four wide column">

            <div onMouseLeave={handleLeave} onMouseEnter={handleHover}>
        
            <Edit   updateState={updateState} data={this.props.list}    id={this.props.list.id}Title={this.props.Title} on={this.state.ron}  courseTitle={this.props.list} />


            </div>
        </div>
        <div  class="four wide column">

            <div onMouseLeave={handleLeaveDelete} onMouseEnter={handleHoverDelete}>
              
            <Delete deleted= {deleted }    data={this.props.list}    id={this.props.list.id}Title={this.props.Title} on={this.state.ronDelete}   />


              </div>
        </div>

        </div>
        </center>
            </div>
            <div class="content">

              <div class="meta">
                <span>Easiness : {toNumberString(this.state.diff)}</span>
              </div>
              <div class="meta"> 
                <span>Would Take Again: {this.state.takeAgain}</span>
              </div>
              <div class="meta"> 
                <span>Useful: {this.state.useful}</span>
              </div>
                  <div class="meta"> 
                <span>TextBook: {this.state.TextBook}</span>
              </div>
              <div id ="it" class="description">
                <p>
                {this.state.body} 
                </p>
              </div>
             
              <ThumbsUp  id = {this.props.list.id}  decrementDB={this.props.decrementDB} incrementDB={this.props.incrementDB}  ThumbsUp={this.props.list.thumbsUp}  ThumbsDown={this.props.list.thumbsDown}   />
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