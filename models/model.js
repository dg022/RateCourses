
var mongoose = require("mongoose");
var Schema    =   mongoose.Schema;

var Users = new Schema({ // example from docs
    courseTitle:{
        type        :   String,
        require     :   true
    }, 
    review: [
      

        {
            "body": {
              "type": "String"
            },
            "difficulty": {
              "type": "Number"
            },
            "takeAgain": {
              "type": "String"
            },
            "isTextBook": {
              "type": "String"
            }
          }
    
    
    
    ],
});

exports.model = Users; 