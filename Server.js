
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




app.get('/updateDislikes', async (req, res) => {


  // now we just update the database
  const UpDelta= Number(req.query.UpDelta);
  const DownDelta = Number(req.query.DownDelta);

  const id =  req.query.id
  const title =  req.query.title
  const doc = await Codes.findOne({"courseTitle":req.query.title});
  const list  = doc.review; 

  for(var i = 0; i < list.length; i++){

    if(list[i]._id.equals(id)){ 
      const Up = Number(list[i].thumbsUp); 
      const Down = Number(list[i].thumbsDown); 
      list[i].thumbsUp = Number(Up + UpDelta)
      list[i].thumbsDown = Number(Down + DownDelta)

      doc.review = list; 
      await doc.save(); 
      return; 
    }

  }
  
});


app.get('/updateLikes', async (req, res) => {

  
  const UpDelta= Number(req.query.UpDelta);
  const DownDelta = Number(req.query.DownDelta);
  const id =  req.query.id
  const title =  req.query.title

  const doc = await Codes.findOne({"courseTitle":req.query.title});

  var list  = doc.review; 
  



  for(var i = 0; i < list.length; i++){

    if(list[i]._id.equals(id)){ 

      const Up = Number(list[i].thumbsUp); 
      const Down = Number(list[i].thumbsDown); 

      list[i].thumbsUp = Number(Up + UpDelta)
      list[i].thumbsDown = Number(Down + DownDelta)

      doc.review = list; 
      await doc.save(); 
     
      return; 
     
    }



  }
  





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
 
    
   
    countYes = 0; 
  

    query = async () =>{

      const loc = await Codes.findOne({"courseTitle":req.query.courseTitle})
      console.log(loc)
     res.send(loc);

    }
    


  if(!(await Codes.exists({"courseTitle":req.query.courseTitle })))  {
   

    var newUser = new Codes({"courseTitle":req.query.courseTitle, "review":[obj]}); // you also need here to define _id since, since you set it as required.
    newUser.save(function(err, result){
        if(err){
           console.log(err)
        }else{

    
         this.query();
          
       }


    }); 


  }else{

    const doc = await Codes.findOne({"courseTitle":req.query.courseTitle});
    var newList  = doc.review; 
    newList.push(obj); 
    doc.review =  newList;
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