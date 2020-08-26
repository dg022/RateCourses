
// This server file will be used during production and development builds, its takes  the build folder created after NPM run build and sends this to index.html.

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var cons= ""; 
const  Posts = require("./models/model.js")
var mongoose = require("mongoose");
const Window = require('window');
var nodemailer = require('nodemailer');

 
const window = new Window();

 // const config = require("./config/config.js");
const { connect } = require('http2');
const MAIL = process.env.MAIL // ||config.CON.MAIL;
const PASS = process.env.PASS // ||config.CON.PASS;
var cons= process.env.MOGNO // ||config.CON.KEY;
if(process.env.MOGNO!=null){
 cons = process.env.MOGNO
 const root = require('path').join(__dirname, 'client', 'build')
 app.use(express.static(root));
 app.get("/", (req, res) => {
     res.sendFile('index.html', { root });
 })
}


mongoose.connect(cons, { useNewUrlParser: true });

var Codes = mongoose.model('Codes', Posts.model);



app.get('/edit', async (req, res) => {

  

  const id =  req.query.id
  const title =  req.query.courseTitle
  
  const doc = await Codes.findOne({"courseTitle":title});

  const list  = doc.review; 



  for(var i = 0; i < list.length; i++){

    if(list[i].publicid == id){ 
      
      var obj = JSON.parse(req.query.review)
      doc.review[i].body = obj.body; 
      doc.review[i].difficulty = obj.difficulty; 
      doc.review[i].takeAgain = obj.takeAgain; 
      doc.review[i].isTextBook = obj.isTextBook; 
      doc.review[i].thumbsUp = obj.thumbsUp; 
      doc.review[i].thumbsDown = obj.thumbsDown; 
      await doc.save(); 

  
  
      res.send(true)


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
  res.send(true);

  Codes.remove({"courseTitle":req.query.courseTitle }, function(err) {
    if (!err) {
            console.log(err)
    }
    else {
          console.log("delted sucessfully")
    }
});
  
   return; 
  }




  res.send(true);
  doc.review = arr;
  await doc.save(); 

  return; 

 








});

  


app.get('/findid', async (req, res) => { 

  const doc = await Codes.findOne({"courseTitle":req.query.courseTitle})

  const id =  req.query.id
  console.log(id)
  const list  = doc.review; 
  console.log("THIS OCCURED AT FIND ID")

  for(var i = 0; i < list.length; i++){

    if(list[i].publicid == id){ 
      console.log(MAIL)
      console.log(PASS)
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: MAIL,
          pass: PASS
        }
      });


      var mailOptions = {
        from: MAIL,
        to: doc.review[i].email,
        subject: 'Edit Code from RateCoursesUWO',
        text: doc.review[i].id
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
      
      console.log("EMAIL SHOULD HAVE SENT")

      res.send(true);
      return; 
    }

  }


});
app.get('/sendFeedBack', async (req, res) => { 



  const response =  req.query.resp
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: MAIL,
          pass: PASS
        }
      });
      var mailOptions = {
        from: MAIL,
        to: MAIL,
        subject: 'FEEDBACK',
        text: response
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send(true);
});

app.get('/checkEmail', async (req, res) => {

  

  const doc = await Codes.findOne({"courseTitle":req.query.courseTitle});
  if(doc==null){
    res.send(true);
  }
  var newList  = doc.review; 
 
  
  var obj = JSON.parse(req.query.review)
 
  for(var i = 0; i < newList.length; i++){
  
    if(newList[i].email == obj.email){ 
  
      res.send(false)
     
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
      var obj =  loc.review
  
      for(var i = 0; i < obj.length; i++){
    
        obj[i].id = "";
        obj[i].email="";
    
      }
      res.send(obj);
    }
    


  if(!(await Codes.exists({"courseTitle":req.query.courseTitle })))  {
   

    var newUser = new Codes({"courseTitle":req.query.courseTitle, "review":[obj]});

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
    var obj =  newList
  
    for(var i = 0; i < obj.length; i++){
  
      obj[i].id = "";
      obj[i].email="";
  
    }

    res.send(obj);
  }
 });



 app.get('/checkCode', async (req, res) => { 

  const doc = await Codes.findOne({"courseTitle":req.query.courseTitle})

  const publicid =  req.query.publicid
  const userEnteredid=  req.query.userEnteredid
  const list  = doc.review; 


  for(var i = 0; i < list.length; i++){

    if(list[i].publicid == publicid){ 

      if(list[i].id == userEnteredid )
      res.send(true)
      return; 
    }
  }
  res.send(false);
});





// This path is used for get queries, whether to find if a post for a course within a db exists or not, then returning the result. 
app.get('/dbr', async (req, res) => {


 if(await Codes.exists({ courseTitle: req.query.department })){

  doc = await Codes.findOne({"courseTitle":req.query.department});
  
  

  var obj =  doc.review

  for(var i = 0; i < obj.length; i++){

    obj[i].id = "";
    obj[i].email="";

  }




  res.send(obj);


 }else{
   res.send(false)
 }
});




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});
