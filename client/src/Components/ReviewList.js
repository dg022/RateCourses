
import React from 'react'; 
import SingleReview from './SingleReview';
import "./Review.css";

var  average = 0;
var count  = 0; 
var countYes = 0; 
var countYesText = 0;

const ReviewList = (props) => {
  average = 0;
  count  = 0;
  countYes = 0;
  countYesText = 0;
  
  const images = props.list.map(msg => {
    console.log(msg)

  
    if(msg.takeAgain == "Yes"){
      countYes++;
    }

    if(msg.isTextBook == "Yes"){
      countYesText++;
    }

    average+=msg.difficulty;
    count++; 
    
    return <SingleReview list={msg} />;
  });

  return (
    <div> 
      <div class="ui segment" >

      
        <center>

        <h1> {props.Title}</h1>



        <div> 
              <div class="ui statistic">
          <div class="value">
           {(average/count).toFixed(1) }/5.0
          </div>
          <div class="label">
            Average diffiuctly Score from {count} reviews
          </div>
        </div>


   


        <div class="ui statistic">
          <div class="value">
          <i class="check circle outline icon "></i>  {(countYes/count)*100}% 
          </div>
          <div class="label">
            Would take the course again
          </div>
        </div>


        <div class="ui statistic">
          <div class="value">
          <i class="book icon small"></i>  {(countYesText/count)*100}% 
          </div>
          <div class="label">
            Said a TextBook is required
          </div>
        </div>
        </div>
        </center>
        


      
        </div>


        <div id="Review"className="ui items "> {images}</div>
      </div>


  
 

  )
  
}


export default ReviewList;