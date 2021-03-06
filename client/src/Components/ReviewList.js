
import React from 'react'; 
import SingleReview from './SingleReview';
import "./Review.css";
import Star from './Stars'; 
import { Button } from 'semantic-ui-react'
import ParticlesBg from "particles-bg";

var  average = 0;
var count  = 0; 
var countYes = 0; 
var countYesText = 0;
var useful = 0;

const ReviewList = (props) => {
  average = 0;
  count  = 0;
  countYes = 0;
  countYesText = 0;
  useful = 0; 

 const list  = props.list;


  list.sort((a, b) => parseFloat(b.thumbsUp - b.thumbsDown) - parseFloat(a.thumbsUp-a.thumbsDown));

  
  const images = list.map(msg => {
   

  
    if(msg.takeAgain == "Yes"){
      countYes++;
    }

    if(msg.useful == "Yes"){
      useful++;
    }


    if(msg.isTextBook == "Yes"){
      countYesText++;
    }

    average+=msg.difficulty;
    count++; 
    
    return <SingleReview  Title={props.Title} decrementDB={props.decrementDB} incrementDB={props.incrementDB} list={msg} />;
  });

  return (
    <div> 

      
      <div id="seg"class="ui segment" >

      
        <center>

        <h1> {props.Title}</h1>
    
   


        <div  > 
        <div  id="stat" class="ui statistic">
        
          <div class="value">
           {(average/count).toFixed(1) }/5.0
          </div>
         
          <div class="label">
            Average Easiness  Score from {count} reviews 
             <br/>
             (1 = Super hard, 5=Total bird)
          </div>
         
        </div>


   


        <div id="stat" class="ui statistic">
          <div class="value">
          <i class="check circle outline icon "></i>  {((countYes/count)*100).toFixed(0)}% 
          </div>
          <div class="label">
            Would take the course again
          </div>
        </div>


        
        <div id="stat" class="ui statistic">
          <div class="value">
          <i class="thumbs up outline icon"></i> {((useful/count)*100).toFixed(0)}% 
          </div>
          <div class="label">
            Found the course useful
          </div>
        </div>


        <div id="stat" class="ui statistic">
          <div class="value">
          <i class="book icon small"></i>  {((countYesText/count)*100).toFixed(0)}% 
          </div>
          <div class="label">
            Said a TextBook is required
          </div>
        </div>
        </div>
        </center>
        


      
        </div>

        
        <div id="Review"className="ui items "> 
    
        {images}
       
        </div>

    

      </div>


  
 

  )
  
}


export default ReviewList;