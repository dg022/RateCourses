import React, { Component } from 'react';
import { BinaryFeedback } from 'react-simple-user-feedback';

class Example extends Component {
    constructor(props){

        super(props)

        this.state = {
            positiveCount: 0,
            negativeCount: 0
        }
    }

    onPositiveClick = () => {
        this.setState(prevState => {
            return { positiveCount: prevState.positiveCount + 1 }
        });
    }

    onNegativeClick = () => {
        this.setState(prevState => {
            return { negativeCount: prevState.negativeCount + 1 }
        });
    }

    render(){
        return (
            <div>
                <BinaryFeedback
                    onPositiveClick={this.onPositiveClick}
                    onNegativeClick={this.onNegativeClick}
                />

            {this.state.positiveCount}
            </div>
        );
    }
}export default Example;