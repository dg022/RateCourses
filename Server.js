
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

 //const config = require("./config/config.js");
const { connect } = require('http2');
const MAIL = process.env.MAIL // ||config.CON.MAIL;
const PASS = process.env.PASS  //||config.CON.PASS;
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

app.get('/decreaseDislikes', async (req, res) => {
  
  const id =  req.query.id
  const title =  req.query.title
  const doc = await Codes.findOne({"courseTitle":req.query.title});
  var list  = doc.review; 
  
  



  for(var i = 0; i < list.length; i++){

    if(list[i].publicid == id){ 
     
      const Down = Number(list[i].thumbsDown);
      
      list[i].thumbsDown = Number(Down - 1)
      doc.review = list; 
      await doc.save(); 
      return; 
    }
  }
});


app.get('/updateDislikes', async (req, res) => {
  
  const id =  req.query.id
  const title =  req.query.title
  const doc = await Codes.findOne({"courseTitle":req.query.title});
  var list  = doc.review; 




  for(var i = 0; i < list.length; i++){

    if(list[i].publicid == id){ 
    
      const Down = Number(list[i].thumbsDown);
      list[i].thumbsDown = Number(Down + 1)
      doc.review = list; 
      await doc.save(); 
      return; 
    }
  }
});


app.get('/updateLikes', async (req, res) => {

  const id =  req.query.id
  const title =  req.query.title
 
  const doc = await Codes.findOne({"courseTitle":req.query.title});

  var list  = doc.review; 




  for(var i = 0; i < list.length; i++){

    if(list[i].publicid == id){ 
  
      const Up = Number(list[i].thumbsUp);
      list[i].thumbsUp = Number(Up + 1)
      doc.review = list; 
      await doc.save(); 
      return; 
    }
  }
});


app.get('/decreaseLikes', async (req, res) => {
  
  const id =  req.query.id
  const title =  req.query.title
  const doc = await Codes.findOne({"courseTitle":req.query.title});
  var list  = doc.review; 
 



  for(var i = 0; i < list.length; i++){

    if(list[i].publicid == id){ 
     
      
      const Up = Number(list[i].thumbsUp);
      list[i].thumbsUp = Number(Up - 1)
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

    if(list[i].publicid != id){ 
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


emailHtml = (editcode) => {

 var htmlemail='<!doctype html><html> <head> <meta name="viewport" content="width=device-width" /> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <title>Simple Transactional Email</title> <style> /* ------------------------------------- GLOBAL RESETS ------------------------------------- */ /*All the styling goes here*/ img { border: none; -ms-interpolation-mode: bicubic; max-width: 100%; } body { background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } table { border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; } table td { font-family: sans-serif; font-size: 14px; vertical-align: top; } /* ------------------------------------- BODY & CONTAINER ------------------------------------- */ .body { background-color: #f6f6f6; width: 100%; } /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */ .container { display: block; margin: 0 auto !important; /* makes it centered */ max-width: 580px; padding: 10px; width: 580px; } /* This should also be a block element, so that it will fill 100% of the .container */ .content { box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px; } /* ------------------------------------- HEADER, FOOTER, MAIN ------------------------------------- */ .main { background: #ffffff; border-radius: 3px; width: 100%; } .wrapper { box-sizing: border-box; padding: 20px; } .content-block { padding-bottom: 10px; padding-top: 10px; } .footer { clear: both; margin-top: 10px; text-align: center; width: 100%; } .footer td, .footer p, .footer span, .footer a { color: #999999; font-size: 12px; text-align: center; } /* ------------------------------------- TYPOGRAPHY ------------------------------------- */ h1, h2, h3, h4 { color: #000000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px; } h1 { font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize; } p, ul, ol { font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px; } p li, ul li, ol li { list-style-position: inside; margin-left: 5px; } a { color: #3498db; text-decoration: underline; } /* ------------------------------------- BUTTONS ------------------------------------- */ .btn { box-sizing: border-box; width: 100%; } .btn > tbody > tr > td { padding-bottom: 15px; } .btn table { width: auto; } .btn table td { background-color: #ffffff; border-radius: 5px; text-align: center; } .btn a { background-color: #ffffff; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; color: #3498db; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; } .btn-primary table td { background-color: #3498db; } .btn-primary a { background-color: #3498db; border-color: #3498db; color: #ffffff; } /* ------------------------------------- OTHER STYLES THAT MIGHT BE USEFUL ------------------------------------- */ .last { margin-bottom: 0; } .first { margin-top: 0; } .align-center { text-align: center; } .align-right { text-align: right; } .align-left { text-align: left; } .clear { clear: both; } .mt0 { margin-top: 0; } .mb0 { margin-bottom: 0; } .preheader { color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0; } .powered-by a { text-decoration: none; } hr { border: 0; border-bottom: 1px solid #f6f6f6; margin: 20px 0; } /* ------------------------------------- RESPONSIVE AND MOBILE FRIENDLY STYLES ------------------------------------- */ @media only screen and (max-width: 620px) { table[class=body] h1 { font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a { font-size: 16px !important; } table[class=body] .wrapper, table[class=body] .article { padding: 10px !important; } table[class=body] .content { padding: 0 !important; } table[class=body] .container { padding: 0 !important; width: 100% !important; } table[class=body] .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table { width: 100% !important; } table[class=body] .btn a { width: 100% !important; } table[class=body] .img-responsive { height: auto !important; max-width: 100% !important; width: auto !important; } } /* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; } .btn-primary table td:hover { background-color: #34495e !important; } .btn-primary a:hover { background-color: #34495e !important; border-color: #34495e !important; } } </style> </head> <body class=""> <span class="preheader">Your code from RateCourses...</span> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"> <tr> <td>&nbsp;</td> <td class="container"> <div class="content"> <!-- START CENTERED WHITE CONTAINER --> <table role="presentation" class="main"> <!-- START MAIN CONTENT AREA --> <tr> <td class="wrapper"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td> <p> Your Edit Code!</p> <p> <strong>' +editcode+ ' </strong></p>   <p>Cheers,</p> <p>David George Lead Engineer and Founder of RateCourses.</p> </td> </tr> </table> </td> </tr> <!-- END MAIN CONTENT AREA --> </table> <!-- END CENTERED WHITE CONTAINER --> <!-- START FOOTER --> <!-- END FOOTER --> </div> </td> <td>&nbsp;</td> </tr> </table> </body></html>'
return htmlemail;








}



  


app.get('/findid', async (req, res) => { 

  console.log(req.query)
  
  const doc = await Codes.findOne({"courseTitle":req.query.courseTitle})

  const id =  req.query.id
  
  const list  = doc.review; 
  

  for(var i = 0; i < list.length; i++){

    if(list[i].publicid == id){ 
   
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
        html: emailHtml(doc.review[i].id)
        
        
       
        
        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
      

      

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
    return;
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
