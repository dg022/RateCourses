import React from 'react'
import './App.css';
import $ from 'jquery';
import Example from "./Components/search";
import Model from "./Components/ReviewAdd"
import DepartmentSearch from "./Components/DepartmentSearch"
import CourseSearch from "./Components/search"

import axios from "axios"
import Form from "./Components/ReviewAdd"
import Scale from "./Components/Scale"
import ReviewList from "./Components/ReviewList"
import Models from "./Components/Model"
import Email from "./Components/Email"
import ParticlesBg from "particles-bg";


import {Link } from "react-router-dom";
var validator = require("email-validator");
var swearjar = require('swearjar-extended');






var mongoose = require("mongoose");





class App extends React.Component {
  state = {
    Department:"",
    Course:"",
    NotFound:false,
    TakeAgain:"", 
    Difficulty:1,
    TextBook:"",
    About:"",
    error:0,
    willClose:0,
    email:"",
    Reviews:[], 
    id:"",
    useful:"",
    Profanity:false,
    EmailCheck:false,
    properemail:false, 
    token:""

  };

chooseDep = (Dep) =>{
this.setState({Department:Dep})
}

back=()=>{
  window.location.reload()
 
}


;


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

 
  var email = await this.checkEmail()
  
  
 
 
  if(email&& this.state.TakeAgain!="" && this.state.Difficulty!=null && this.state.TextBook!="" && check && !profanity&& this.state.useful!="" && this.state.About.length <=600){
    this.setState({error:0})
    this.setState({EmailCheck:false})
    this.setState({properemail:false})
    this.setState({Profanity:false})
    this.setState({willClose:1})
    this.AddToDataBase();
    // if it passes all these tests, that means we are good to send the edit code to the email right away. 
   
    
    
  }else{

    // If this is the case, we want place an error messages saying the mandatory fields have not been filled out  yet
    console.log("Fields are missing, cannot submit form")
    console.log(email)

    if(profanity){
     
      this.setState({Profanity:true})
    }

    if(!check){
      console.log("this was supposed to happen")
      this.setState({properemail:true})
      
    }

    if(!email){
      this.setState({EmailCheck:true})
      
    }

    if(!profanity){
      console.log("it tried to reset it")
      this.setState({Profanity:false})
    }

    if(email){

      this.setState({EmailCheck:false})
    }

    if(check){

      this.setState({properemail:false})
    }

    if(this.state.TakeAgain=="" || this.state.Difficulty==null || this.state.TextBook==""  || this.state.About.length > 600|| this.state.useful==""){

    this.setState({error:1}); 
    }

    if(this.state.TakeAgain!="" && this.state.Difficulty!=null && this.state.TextBook!=""  && this.state.About.length <= 600&& this.state.useful!=""){

      this.setState({error:0}); 
      }

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
   
   

checkEmail = async() => {

  const list = {
    "email":this.state.email,
  };

  let res = await axios.get('/checkEmail', {
    params: {
      courseTitle: this.state.Course,
      review:list, 
    }
  });


  return(res.data)


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
    console.log(res.data)
    this.setState({Reviews:res.data})


  }

  

  }

}



goBack = ()=>{
  this.setState({Department:""})
}
AddToDataBase = async () =>{

  var c = this.makeid(7)
  var p =  this.makeid(7)
  this.setState({id:p})
  
   const list = {
    "body": this.state.About,
    "difficulty":this.state.Difficulty,
    "takeAgain":this.state.TakeAgain,
    "isTextBook":this.state.TextBook,
    "email":this.state.email,
    "thumbsUp":0,
    "thumbsDown":0,
    "id":c,
    "publicid":p,
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
    Reviews: res.data
  })

  let ses = await axios.get('/findid', {
    params: {
      courseTitle: this.state.Course,
      id:p
  }});





  

 

  



}







changeBackground = () => {

  document.getElementsByTagName('canvas')[0].style.height = document.body.scrollHeight.toString()+"px"
}

changeWidth = ()=> {
  document.querySelector("#but").style.width = "100%"
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

  window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }
  if(window.mobileAndTabletCheck()){

 

    return(
      <div>
       
         <ParticlesBg color="#4f2683" type="square" bg={true}/>
         <div id="c" class="ui card">
    <div class="content">
      <div class="header">Welcome to RateCoursesUWO</div>
      <div class="meta">By students for students</div>
      <div class="description">
   Coming to mobile soon! For now switch to desktop!
  </div>
  
      </div>
     

    
  
  
         
      </div>
      </div>
  );
  }


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
  <center>  <Models/> </center>
  </div>
  


       
    </div>
    </div>
);
}


if(this.state.Reviews.length!=0 || this.state.NotFound == true){

  if(this.state.Reviews.length==0){


      return(

        
  
        <div>
        
         <ParticlesBg color="#4f2683" type="circle" bg={true}/>
     
         <div id="e" class="ui card">
         <div class="content">
    <div class="header"> <center> {this.state.Course}</center></div>
    </div>

        
          </div>
      
         <div id="c" class="ui card">
         <div class="content">
    <div class="header"> <center> Be the first Review!</center></div>
    </div>
    <div class="description"> 
    <Form  properemail={this.state.properemail} back ={this.back}resetClose={this.resetClose} willClose={this.state.willClose} EmailCheck={this.state.EmailCheck} Profanity={this.state.Profanity} Error={this.state.error} email={this.email} useful={this.useful} SubmitForm={this.SubmitForm} TakeAgain={this.TakeAgain} Difficulty={this.Difficulty} About={this.About} TextBook={this.TextBook}  />
    </div>
        
          </div>
          
  
  
           
       
                </div>
  
  
      );
  
  }


  
  return(
  
    <div>
     
      <ParticlesBg color="#4f2683" type="circle" bg={true}/>
     
      
        
        <ReviewList
     
        
      
        decrementDB={this.decrementDB} incrementDB={this.incrementDB} Title={this.state.Course}list={this.state.Reviews} />
         
       
        <Form properemail={this.state.properemail} back={this.back} useful={this.useful} Profanity={this.state.Profanity} EmailCheck={this.state.EmailCheck} email={this.email} resetClose={this.resetClose} willClose={this.state.willClose} Error={this.state.error}   SubmitForm={this.SubmitForm} TakeAgain={this.TakeAgain} Difficulty={this.Difficulty} About={this.About} TextBook={this.TextBook} Submit  />
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
    <center> 
    <left> <div id="depbut" onClick={this.goBack}class="ui  red basic button"> <i class="left arrow icon"></i></div> </left>
   <right> <div id="depbut" onClick={this.searchDataBase}class="ui  green basic button"><i class="right arrow icon"></i></div> </right>
   </center>
    </div>
    
     
  
         
      </div>
      </div>
  );




   
  }


 





}




}

export default App; 