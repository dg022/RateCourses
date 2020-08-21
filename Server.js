
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
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});






    //courseTitle: this.state.Course,
    //review:list, 

app.get('/edit', async (req, res) => {

  

  //courseTitle: this.state.Course,
  //review:list, 
  //id:this.state.id

  const id =  req.query.id
  const title =  req.query.courseTitle
  
  const doc = await Codes.findOne({"courseTitle":title});

  const list  = doc.review; 



  for(var i = 0; i < list.length; i++){

    if(list[i].id == id){ 
      
      var obj = JSON.parse(req.query.review)
      doc.review[i] = obj; 
      await doc.save(); 
      res.send(doc)
      return; 
    }

  }




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

    if(list[i].id == id){ 
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

    if(list[i].id == id){ 

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


app.get('/delete', async (req, res) => { 
 
  const doc = await Codes.findOne({"courseTitle":req.query.courseTitle})

  const id =  req.query.id
  const list  = doc.review;
  const arr = []
  for(var i = 0; i < list.length; i++){

    if(list[i].id != id){ 
      arr.push(list[i])
    }
  
  }

  if(arr.length == 0){
  doc.review = arr;
  res.send(arr);
  

   //Model.remove({ _id: req.query._id }, function(err) {
    //if (!err) {
        //    message.type = 'notification!';
   //}
    ///else {
      //      message.type = 'error';
    //}

   await doc.save(); 
   return; 
  }

  res.send(arr);
  doc.review = arr;
  await doc.save(); 

  return; 

 








});

app.get('/findid', async (req, res) => { 

  const doc = await Codes.findOne({"courseTitle":req.query.courseTitle})

  const id =  req.query.id
  const list  = doc.review; 


  for(var i = 0; i < list.length; i++){

    if(list[i].id == id){ 

      res.send(doc.review[i].email)
      return; 
    }

  }







});

app.get('/checkEmail', async (req, res) => {


  const doc = await Codes.findOne({"courseTitle":req.query.courseTitle});
  var newList  = doc.review; 
  
  var obj = JSON.parse(req.query.review)
  console.log(obj.email)
  for(var i = 0; i < newList.length; i++){
  
    if(newList[i].email == obj.email){ 
  
      res.send(false)
      console.log("this EMAIL error ")
      return; 
    }
  
  }
  
res.send(true); 


  });




app.get('/dbrAdd', async (req, res) => {



    var obj = JSON.parse(req.query.review)
  
 
    
   
    countYes = 0; 
  

    query = async () =>{

      const loc = await Codes.findOne({"courseTitle":req.query.courseTitle})
      
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