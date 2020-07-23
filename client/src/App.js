import React from 'react'
import './App.css';
import $ from 'jquery';
import Example from "./search";
import Model from "./ReviewAdd"
import Comment from "./Comment"
const Courses = require("./Courses.js"); 






class App extends React.Component {

 
  

render(){
    

  

    return(


        <div>

<<<<<<< Updated upstream

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

      

    </div>

  </div>

  <Comment/>
=======
return(
      <div class="ui menu inverted">
        <div class="header item">
        RateMyCourse UWO
        </div>
        <a class="item">
          About
        </a>
        <a class="item">
          Feedback
        </a>
      </div>
  );
}
>>>>>>> Stashed changes




<<<<<<< Updated upstream
  <div class="ui inverted vertical footer segment">
=======
return(
  <div class="ui vertical footer segment center aligned">
>>>>>>> Stashed changes
    <div class="ui container">
    © 2020. Brought to you by David George, Nathan Pogue and Huda Mukhtar 
    </div>
  </div>
<<<<<<< Updated upstream
</div>
=======
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
                RateMyCourse UWO
              </h1>
              <h3>This platform is designed to provide wholistic reviews of courses offered at Western University</h3>
              <h4 class = "warning">*Not affiliated with Western University or any of its satellite campuses</h4>

              <div class="ui huge primary button">Find A Course<i class="right arrow icon"></i></div>
              <div  onClick={this.searchDataBase}class="ui huge primary button">Rate A Course<i class="right arrow icon"></i></div>   

              <DepartmentSearch chooseDep={this.chooseDep}/>
              <CourseSearch  selectCourse={this.chooseCourse}  chooseCourse={this.state.Department}/>

             
            </div>
            
          </div>
>>>>>>> Stashed changes








        </div>
<<<<<<< Updated upstream
        
=======
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
            RateMyCourse UWO
          </h1>
          <h3>This platform is designed to provide wholistic reviews of courses offered at Western University</h3>
          <h4 class = "warning">*Not affiliated with Western University or any of its satellite campuses</h4>

          <DepartmentSearch chooseDep={this.chooseDep}/>

          

        </div>
      </div>
      {this.renderFooter()}
    </div>
            </div>
            
>>>>>>> Stashed changes
       


    );






}




}

export default App; 