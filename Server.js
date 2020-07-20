
// This server file will be used during production and development builds, its takes  the build folder created after NPM run build and sends this to index.html.

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const config = require("./config/config.js"); 
const cons =  process.env.MONGO || config.KEY;
const  Posts = require("./models/model.js")
var mongoose = require("mongoose");
mongoose.connect(cons, { useNewUrlParser: true });

var Codes = mongoose.model('Codes', Posts.model);


//app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));
});





app.get('/dbrAdd', async (req, res) => {

  //1. If the database is empty for a specfic course, we want to add it, place the overall, % who needed textbook, %would take again, increment number of revierws
  //2. If the database is NOT empty for a specfic course, 
    // a) We want to add it to the list 
    // b) Calculate the new overall rating 
    // c) Calculate the % who needed the textbook
    // d) Calcualte the % that would take it again
    // e) Increment the number of reviewrs


    var obj = JSON.parse(req.query.review)
    var wouldTakeAgain = obj.takeAgain
    var text = obj.isTextBook
    var TakeAgain  = 1
    var TextBook  = 1
    if(wouldTakeAgain == "yes"){
      TakeAgain = 1
    }
    if(wouldTakeAgain == "No"){
      TakeAgain = 0
    }
    if(text == "yes"){
      TextBook= 1
    }

    if(text== "No"){
      TextBook = 0
    }
  
    

  if(!(await Codes.exists({"courseTitle":req.query.courseTitle })))  {
   

    var newUser = new Codes({"courseTitle":req.query.courseTitle, "review":[obj], "overall":obj.difficulty, "wouldTakeAgain":TakeAgain, "TextBook":TextBook, "Total":1 } ); // you also need here to define _id since, since you set it as required.
    newUser.save(function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log('>>>>>> ' + JSON.stringify(result, null, 4));
       }
    }); 

  }else{

    // a) We want to add it to the list 
    // b) Calculate the new overall rating 
    // c) Calculate the % who needed the textbook
    // d) Calcualte the % that would take it again
    // e) Increment the number of reviewrs

    
    const doc = await Codes.findOne({"courseTitle":req.query.courseTitle});
    var newTotal = doc.Total + 1;
    var newOverall = doc.overall + obj.difficulty;
    var isTextBook = doc.TextBook + TextBook;
    var wouldTakeAgain = doc.wouldTakeAgain + TakeAgain;


    var newList  = doc.review; 
   
    newList.push(obj); 
    doc.review =  newList;
    doc.overall =  newOverall;
    doc.wouldTakeAgain = wouldTakeAgain;
    doc.TextBook = isTextBook; 
    doc.Total = newTotal; 
    
     newList = [...newList.values()]

    await doc.save(); 

    res.send(doc);










  }



 

 
 
 
 
 
 });


// This path is used for get queries, whether to find if a post for a course within a db exists or not, then returning the result. 
app.get('/dbr', async (req, res) => {


 if(await Codes.exists({ courseTitle: req.query.department })){

  doc = await Codes.findOne({"courseTitle":req.query.department});
  res.send(doc);


 }else{
   res.send(false)
 }





});



app.listen(process.env.PORT || 8080);