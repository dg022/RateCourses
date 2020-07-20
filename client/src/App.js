import React from 'react'
import './App.css';
import $ from 'jquery';
import Example from "./Components/search";
import Model from "./Components/ReviewAdd"
import DepartmentSearch from "./Components/DepartmentSearch"
import CourseSearch from "./Components/search"
import Feedback from './Feedback'

const Courses = require("./Components/Courses.js"); 







class App extends React.Component {
  state = {

    Department:"",
  
  
  
  };

chooseDep = (Dep) =>{
this.setState({Department:Dep})





}



renderHeader = () => {


  return(

    <div class="ui container">
      <div class="ui large secondary inverted pointing menu">
        <a class="toc item">
          <i class="sidebar icon"></i>
        </a>
        <li><link to = {"/Feedback"}><a class="active item">Home</a></Link></li>
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
    

  if(this.state.Department!=""){

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
              <DepartmentSearch chooseDep={this.chooseDep}/>
              <CourseSearch chooseCourse={this.state.Department}/>
    
              
    
            </div>
    
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