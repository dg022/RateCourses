import React from 'react'
import './App.css';
import $ from 'jquery';
import Example from "./Components/search";
import Model from "./Components/ReviewAdd"
import DepartmentSearch from "./Components/DepartmentSearch"
import CourseSearch from "./Components/search"
import Feedback from './Feedback'
import axios from "axios"
import Form from "./Components/ReviewAdd"
import Scale from "./Components/Scale"
import ReviewList from "./Components/ReviewList"
import Email from "./Components/Email"
import { Button } from 'semantic-ui-react'
import ParticlesBg from "particles-bg";

import {Link } from "react-router-dom";
var validator = require("email-validator");
var swearjar = require('swearjar-extended');






var mongoose = require("mongoose");
const Courses = require("./Components/Courses.js"); 



class App extends React.Component {
  state = {
    Department:"",
    Course:"",
    NotFound:false,
    TakeAgain:"", 
    Difficulty:null,
    TextBook:"",
    About:"",
    error:0,
    willClose:0,
    email:"",
    Reviews:[], 
    id:"",
    useful:"",
    Profanity:false,
    token:""

  };

chooseDep = (Dep) =>{
this.setState({Department:Dep})
}


sendFeedback =  (templateId, variables) => {
  window.emailjs.send(
    'gmail', templateId,
    variables
    ).then(res => {
      console.log('Email successfully sent!')
    })
    // Handle errors here however you like, or use a React error boundary
    .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }

SubmitForm = async () =>{



  var check = validator.validate(this.state.email); // true
 var profanity =  swearjar.profane(this.state.About); 
 
 
  if(this.state.TakeAgain!="" && this.state.Difficulty!=null && this.state.TextBook!="" && check && !profanity&& this.state.useful!="" && this.state.About.length <=600){
    this.setState({error:0})
    this.setState({willClose:1})
    this.AddToDataBase();
    // if it passes all these tests, that means we are good to send the edit code to the email right away. 
   
    
    
  }else{

    // If this is the case, we want place an error messages saying the mandatory fields have not been filled out  yet
    console.log("Fields are missing, cannot submit form")

    if(profanity){
     
      this.setState({Profanity:true})
    }

    if(this.state.TakeAgain=="" || this.state.Difficulty==null || this.state.TextBook==""  || this.state.About.length > 600|| this.state.useful!="")

    this.setState({error:1}); 
  }

}

















decrementDB =  async (id, UpDelta, DownDelta) => {

  // when we are here, we have been notified that a change has occured, with the id  passed,
  // now we need to query the database with the the given id, 

  let res = await axios.get('/updateDislikes', {
    params: {
      UpDelta: UpDelta,
      DownDelta:DownDelta,
      id:id,
      title:this.state.Course
    }
  });


}

incrementDB =  async (id, UpDelta, DownDelta) => {

  

  let res = await axios.get('/updateLikes', {
    params: {
      UpDelta: UpDelta,
      DownDelta:DownDelta,
      id:id,
      title:this.state.Course
    }
  });

  


}

useful = (ans) => {
  
  this.setState({useful:ans})
}

resetClose = () =>{
  this.setState({willClose:0})
}
email = (em) => {
  this.setState({email:em})
}
chooseCourse = (Co) =>{
  console.log("WOW")
  if(Co!=""){
    console.log("WOW")
  this.setState({Course:Co})
  }else{
    console.log("You need to select a course")
  }
  }
  TakeAgain = (Choice) =>{

    this.setState({TakeAgain:Choice})
    }
Difficulty = (num) =>{
      this.setState({Difficulty:num})
      }
TextBook = (num) =>{
        this.setState({TextBook:num})
        }
About = (Abt) =>{
          this.setState({About:Abt})
     }



     makeid = (length) => {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }
   
   

searchDataBase = async () =>{

  if(this.state.Course.length!=0){

  let res = await axios.get('/dbr', {
    params: {
      department: this.state.Course
    }
  });




  if(res.data == false){
    this.setState({NotFound:true})
  }else{

    this.setState({Reviews:res.data.review})


  }

  

  }

}


AddToDataBase = async () =>{

  var c = this.makeid(7)
  this.setState({id:c})
  
   const list = {
    "body": this.state.About,
    "difficulty":this.state.Difficulty,
    "takeAgain":this.state.TakeAgain,
    "isTextBook":this.state.TextBook,
    "email":this.state.email,
    "thumbsUp":0,
    "thumbsDown":0,
    "id":c,
    "useful":this.state.useful

  };


  


  let res = await axios.get('/dbrAdd', {
    params: {
      courseTitle: this.state.Course,
      review:list, 
      NotFound:this.state.NotFound
    }
  });
   



  this.setState({ 
    Reviews: []
  })

  this.setState({ 
    Reviews: res.data.review
  })

  const templateId = 'template_swHMraBb';
  this.sendFeedback(templateId, {message_html: c, from_name: "David", reply_to: this.state.email})




  

 

  



}





renderHeader = () => {


  return(

    <div class="ui container">
      <div class="ui large secondary inverted pointing menu">
        <a class="toc item">
          <i class="sidebar icon"></i>
        </a>
        
        <a class="item">About</a>
        <Link to = "/page2"><a class="item">Feedback</a></Link>
      </div>
    </div>


  );
}


changeBackground = () => {

  document.getElementsByTagName('canvas')[0].style.height = document.body.scrollHeight.toString()+"px"
}


renderFooter  = () => {

return(
  <div class="ui inverted vertical footer segment">
    <div class="ui container">
      <div class="ui stackable inverted divided equal height stackable grid">
        <div class="three wide column">
     
        </div>
        <div class="three wide column">
          <h4 class="ui inverted header">Services</h4>
          <div class="ui inverted link list">
            <a href="#" class="item">Banana Pre-Order</a>
            <a href="#" class="item">DNA FAQ</a>
            <a href="#" class="item">How To Access</a>
            <a href="#" class="item">Favorite X-Men</a>
          </div>
        </div>
        <div class="seven wide column">
          <h4 class="ui inverted header">Footer Header</h4>
          <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
        </div>
      </div>
    </div>
  </div>
);


}



 
  

render(){

if(this.state.Department == ""){

  return(
    <div>
       <ParticlesBg color="#4f2683" type="circle" bg={true}/>
       <div id="c" class="ui card">
  <div class="content">
    <div class="header">Welcome to RateCoursesUWO</div>
    <div class="meta">By students for students</div>
    <div class="description">
    <div > 
 <div class="ui mini horizontal statistic">
  <div class="value">
    1.
  </div>
  <div class="label">
    Pick Department
  </div>
</div>
<br/>
<div class="ui mini horizontal statistic">
  <div class="value">
  2.
  </div>
  <div class="label">
  Pick Course
  </div>
</div>
<br/>
<div class="ui mini horizontal statistic">
  <div class="value">
 3.
  </div>
  <div class="label">
    Rate and view reviews
  </div>
</div>
<br/>
<div class="ui mini horizontal statistic">
  <div class="value">
 4.
  </div>
  <div class="label">
Write your own review
  </div>
</div>
</div>

    </div>
    <h2 id="dep"> Choose Department</h2>
  <DepartmentSearch  chooseDep={this.chooseDep}/>
  </div>
  
   

       
    </div>
    </div>
);
}


if( this.state.Reviews.length!=0 || this.state.NotFound == true){

  if(this.state.Reviews.length==0){
      return(
  
        <div>
         
         <ParticlesBg color="#4f2683" type="circle" bg={true}/>
       
          
    
      
    
            <div class="ui text container">
              <h1 class="ui inverted header">
                No reviews for {this.state.Course} are on record! Be the first!
              </h1>
            </div>
          
  
  
            <Form   resetClose={this.resetClose} willClose={this.state.willClose} Profanity={this.state.Profanity} Error={this.state.error} email={this.email} useful={this.useful} SubmitForm={this.SubmitForm} TakeAgain={this.TakeAgain} Difficulty={this.Difficulty} About={this.About} TextBook={this.TextBook}  />
          
       
        
                </div>
  
  
      );
  
  }


  
  return(
  
    <div>
     
      <ParticlesBg color="#4f2683" type="circle" bg={true}/>
     
      
        
        <ReviewList
     
        
      
        decrementDB={this.decrementDB} incrementDB={this.incrementDB} Title={this.state.Course}list={this.state.Reviews} />
         
       
        <Form  useful={this.useful} Profanity={this.state.Profanity} email={this.email} resetClose={this.resetClose} willClose={this.state.willClose} Error={this.state.error}   SubmitForm={this.SubmitForm} TakeAgain={this.TakeAgain} Difficulty={this.Difficulty} About={this.About} TextBook={this.TextBook} Submit  />
        { this.changeBackground()}
      </div>
  
  
  );
  
  
  
  
  
    }





  if(this.state.NotFound == false){
    return(
      <div>
         <ParticlesBg color="#4f2683" type="circle" bg={true}/>
         <div id="c" class="ui card">
    <div class="content">
      <div class="header">Welcome to RateCoursesUWO</div>
      <div class="meta">By students for students</div>
      <div class="description">
      <div > 
   <div class="ui mini horizontal statistic">
    <div class="value">
      1.
    </div>
    <div class="label">
      Pick Department
    </div>
  </div>
  <br/>
  <div class="ui mini horizontal statistic">
    <div class="value">
    2.
    </div>
    <div class="label">
    Pick Course
    </div>
  </div>
  <br/>
  <div class="ui mini horizontal statistic">
    <div class="value">
   3.
    </div>
    <div class="label">
      Rate and view reviews
    </div>
  </div>
  <br/>
  <div class="ui mini horizontal statistic">
    <div class="value">
   4.
    </div>
    <div class="label">
  Write your own review
    </div>
  </div>
  </div>
  
      </div>
      <h2 id="dep"> Choose Course</h2> 
    <CourseSearch  selectCourse={this.chooseCourse}  chooseCourse={this.state.Department}/>
   <center> <div id="depbut" onClick={this.searchDataBase}class="ui huge violet basic button"> Go!<i class="right arrow icon"></i></div> </center>
    </div>
    
     
  
         
      </div>
      </div>
  );




   
  }


 





}




}

export default App; 