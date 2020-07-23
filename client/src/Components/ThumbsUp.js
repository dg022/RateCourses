import React from 'react';


class Thumbsup extends React.Component  {


state = {
        Up:0,
        Down:0,
        voteUp:false,
        voteDown:false
    };


 incrementUp = () => {

    // so the logic here is that, lets say you havent voted up yet, then you want to check if you have votef
    // Down. If you have voted down, that means you are trying to change you vote
    
    if(!this.state.voteUp){

        // You are trying to change your vote from down to up
        // The logic here, is to now, remove your vote from down, and add it on to up, then
        // set voteUp to now be true, and now downVote to false
        if(this.state.Down){
            this.setState({Down: this.state.Down-1})
            this.setState({Up: this.state.Up+1})
            this.setState({voteUp:true})
            this.setState({voteDown:false})
        }

        else if(!this.state.Up &&!this.state.Down ){
            this.setState({Up: this.state.Up+1})
            this.setState({voteUp:true})
        }

    }

    // Here you need to update the database, so this must also be connected to App.js
    //So here you need to 

 }

 incrementDown = () => {

    if(!this.state.voteDown){

        // You are trying to change your vote from down to up
        // The logic here, is to now, remove your vote from down, and add it on to up, then
        // set voteUp to now be true, and now downVote to false
        if(this.state.Up){
            this.setState({Up: this.state.Up-1})
            this.setState({Down: this.state.Down+1})
            this.setState({voteUp:false})
            this.setState({voteDown:true})
        }

        else if(!this.state.Up &&!this.state.Down ){
            this.setState({Down: this.state.Down+1})
            this.setState({voteDown:true})
        }

    }
    
}



    render(){

        return(

        <div  id="in" class="extra">
             <div onClick={this.incrementUp} class="ui labeled button" tabindex="0">
                <div  class="ui green button">
                    <i class="thumbs up outline icon"></i> Like
                </div>
                <a class="ui basic  green label">
                    {this.state.Up}
                </a>
                </div>
                <div onClick={this.incrementDown}class="ui labeled button" tabindex="0">
                <div class="ui  red button">
                    <i class="thumbs down outline icon"></i> Dislike
                </div>
                <a class="ui basic  red label">
                    {this.state.Down}
                </a>
            </div>
      </div>
        );


        



    }



} export default Thumbsup; 