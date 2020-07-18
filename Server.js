
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

// This path is used for get queries, whether to find if a post for a course within a db exists or not, then returning the result. 
app.get('/dbr', async (req, res) => {


 if(await Codes.exists({ courseTitle: req.query.department })){

 }else{

  // If this is hit, then it does not exist within the database, we send back false, then we have to render a component that says its not there.  
   res.send(false)

  
 }





});



app.listen(process.env.PORT || 8080);