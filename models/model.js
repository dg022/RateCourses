
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
            "isTextbook": {
              "type": "String"
            }
          }
    
    
    
    ],
  overall     :   {
    type        :   Number,
    require     :   true
},

wouldTakeAgain     :   {
    type        :   Number,
    require     :   true
},
TextBook     :   {
    type        :   Number,
    require     :   true
},

Total   :   {
    type        :   Number,
    require     :   true
},



});

exports.model = Users; 