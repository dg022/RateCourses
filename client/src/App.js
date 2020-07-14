import React from 'react'
import './App.css';
import $ from 'jquery';
import Example from "./search";
import Model from "./ReviewAdd"
const Courses = require("./Courses.js"); 






class App extends React.Component {

 
  

render(){
    

  

    return(


        <div>


<div class="pusher">
  <div class="ui inverted vertical masthead center aligned segment">

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

    <div class="ui text container">
      <h1 class="ui inverted header">
        Welcome to Rate Courses UWO
      </h1>
      <h3>This platform is designed to provide wholistic reviews of courses offered at Western University</h3>
      <h4 class = "warning">*Not affiliated with Western University or any of its satellite campuses</h4>
      <div class="ui huge primary button">Find A Course<i class="right arrow icon"></i></div>
      <div class="ui huge primary button">Rate A Course<i class="right arrow icon"></i></div>

      <Example />
      <Model/>

    </div>

  </div>






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
</div>








        </div>
        
       


    );






}




}

export default App; 