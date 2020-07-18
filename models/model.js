
var mongoose = require("mongoose");
var Schema    =   mongoose.Schema;

var Users = new Schema({ // example from docs
    courseTitle         :   {
        type        :   String,
        require     :   true
    }, 
    review: [
        {
         body: String, 
         difficulty: Number,
         takeAgain: Number,
         Atttendance:Number, 
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

});

exports.model = Users; 