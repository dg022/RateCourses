import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import "./Thumbs.css";


class ThumbsUp extends React.Component  {


  

state = {
        Up:this.props.ThumbsUp,
        Down:this.props.ThumbsDown,
        voteUp:false,
        voteDown:false
      
    };



 componentWillReceiveProps =(nextProps)=>{

    
    this.setState({Up:nextProps.ThumbsUp})
    this.setState({Down:nextProps.ThumbsDown})

    
 }




incrementDB = (UpDelta, DownDelta) =>{
    

    
    this.props.incrementDB(this.props.id, UpDelta, DownDelta)


}

decrementDB = (UpDelta, DownDelta) =>{

    // here are calling back the funcito in app.js, with the id for hte given object we are trying to change with the new number of whatever
    this.props.decrementDB(this.props.id, UpDelta, DownDelta)

}



 incrementUp = () => {



    // so the logic here is that, lets say you havent voted up yet, then you want to check if you have votef
    // Down. If you have voted down, that means you are trying to change you vote
    
    if(!this.state.voteUp){

        // You are trying to change your vote from down to up
        // The logic here, is to now, remove your vote from down, and add it on to up, then
        // set voteUp to now be true, and now downVote to false
        if(this.state.voteDown == true){

        
            this.setState({Down: this.state.Down-1})
            this.setState({Up: this.state.Up+1})
            this.setState({voteUp:true})
            this.setState({voteDown:false})
            this.incrementDB(1, -1); 
        }

        else if(!this.state.voteUp &&!this.state.voteDown ){
            // If this is being hit,then it means that no option has been selected
            // UpDelta would be 1, DownDelta would be 0
            this.setState({Up: this.state.Up+1})
            this.setState({voteUp:true})
            this.incrementDB(1, 0); 
        }
    }

    // Here you need to update the database, so this must also be connected to App.js
    //So here you need to 

 }

 incrementDown = () => {

    if(!this.state.voteDown){

        // this is the mirror from going for above
        if(this.state.voteUp){
       
            this.setState({Up: this.state.Up-1})
            this.setState({Down: this.state.Down+1})
            this.setState({voteUp:false})
            this.setState({voteDown:true})
            this.decrementDB(-1, 1);


        }

        else if(!this.state.voteUp &&!this.state.voteDown ){

            // If this is hit, then you dont need to decrement the up votes
            // Only increment the down votes 
            this.setState({Down: this.state.Down+1})
            this.setState({voteDown:true})
            this.decrementDB(0, 1);



        }


     

    }
    
}




    render(){

        return(

        

        <div  id="in" class="extra">

<div class="ui grid">
  
 

  <div  id= "mobileOne" class="six wide column">
             <div onClick={this.incrementUp} class="ui labeled button" tabindex="0">
                <div  class="ui green button">
                    <i class="thumbs up outline icon"></i> Like
                </div>
                <a class="ui basic  green label">
                    {this.state.Up}
                </a>
                </div>
                </div>

                <div id= "mobileTwo" class="six wide column">
                
                <div onClick={this.incrementDown}class="ui labeled button" tabindex="0">
                <div class="ui  red button">
                    <i class="thumbs down outline icon"></i> Dislike
                </div>
                <a class="ui basic  red label">
                    {this.state.Down}
                </a>
            </div>
            </div>



            </div>


      </div>
        );


        



    }



} export default ThumbsUp; 