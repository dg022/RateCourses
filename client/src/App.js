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
    Reviews:[]

  };

chooseDep = (Dep) =>{
this.setState({Department:Dep})
}

SubmitForm = () =>{

  if(this.state.TakeAgain!="" && this.state.Difficulty!=null && this.state.TextBook!=""){

    
    console.log("Query the data base!")
    this.setState({error:0})
    this.setState({willClose:1})
    this.AddToDataBase();



    
  }else{

    // If this is the case, we want place an error messages saying the mandatory fields have not been filled out  yet
    console.log("Fields are missing, cannot submit form")
    this.setState({error:1}); 
    
  }

}

resetClose = () =>{

  this.setState({willClose:0})
}

chooseCourse = (Co) =>{
  this.setState({Course:Co})
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


searchDataBase = async () =>{
  let res = await axios.get('/dbr', {
    params: {
      department: this.state.Course
    }
  });
  console.log(res.data)

  if(res.data == false){
    this.setState({NotFound:true})
  }else{

    this.setState({Reviews:res.data.review})


  }

  



}


AddToDataBase = async () =>{
   const list = {
    "body": this.state.About,
    "difficulty":this.state.Difficulty,
    "takeAgain":this.state.TakeAgain,
    "isTextBook":this.state.TextBook,
  };


  let res = await axios.get('/dbrAdd', {
    params: {
      courseTitle: this.state.Course,
      review:list, 
      NotFound:this.state.NotFound
    }
  });


  console.log(res.data.review)
  



}



renderHeader = () => {


  return(

    <div class="ui container">
      <div class="ui large secondary inverted pointing menu">
        <a class="toc item">
          <i class="sidebar icon"></i>
        </a>
        <a class="active item">Home</a>
        <a class="item">About</a>
        <a class="item">Feedback</a>
      </div>
    </div>


  );
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



  if(this.state.Department!="" && this.state.NotFound == false){

      return(


        <div>
        <div class="pusher">
          <div class="ui inverted vertical masthead center aligned segment">
    
              {this.renderHeader()}
            <div class="ui text container">
              <h1 class="ui inverted header">
                Welcome to Rate Courses UWO
              </h1>
              <h3>This platform is designed to provide wholistic reviews of courses offered at Western University</h3>
              <h4 class = "warning">*Not affiliated with Western University or any of its satellite campuses</h4>
              <div class="ui huge primary button">Find A Course<i class="right arrow icon"></i></div>
              <div  onClick={this.searchDataBase}class="ui huge primary button">Rate A Course<i class="right arrow icon"></i></div>   
              <DepartmentSearch chooseDep={this.chooseDep}/>
              <CourseSearch  selectCourse={this.chooseCourse}  chooseCourse={this.state.Department}/>
            </div>

            


          </div>

          <ReviewList list={this.state.Reviews} />
              {this.renderFooter()}
        </div>
                </div>



      );





  }

  else if( this.state.Department!="" && this.state.NotFound == true){

    return(

      <div>
      <div class="pusher">
        <div class="ui inverted vertical masthead center aligned segment">
  
            {this.renderHeader()}
  
          <div class="ui text container">
            <h1 class="ui inverted header">
              No reviews for {this.state.Course} are on record! Be the first!
            </h1>
          </div>

          <Form  resetClose={this.resetClose} willClose={this.state.willClose} Error={this.state.error}   SubmitForm={this.SubmitForm} TakeAgain={this.TakeAgain} Difficulty={this.Difficulty} About={this.About} TextBook={this.TextBook} Submit  />
        </div>
            {this.renderFooter()}
      </div>
              </div>
    );
  }
    return(
            <div>
    <div class="pusher">
      <div class="ui inverted vertical masthead center aligned segment">

          {this.renderHeader()}

        <div class="ui text container">
          <h1 class="ui inverted header">
            Welcome to Rate Courses UWO
          </h1>
          <h3>This platform is designed to provide wholistic reviews of courses offered at Western University</h3>
          <h4 class = "warning">*Not affiliated with Western University or any of its satellite campuses</h4>
          <div class="ui huge primary button">Find A Course<i class="right arrow icon"></i></div>
          <div class="ui huge primary button">Rate A Course<i class="right arrow icon"></i></div>

          <DepartmentSearch chooseDep={this.chooseDep}/>

          

        </div>
      </div>
      {this.renderFooter()}
    </div>
            </div>
            
       


    );






}




}

export default App; 