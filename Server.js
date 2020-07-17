
// This server file will be used during production and development builds, its takes  the build folder created after NPM run build and sends this to index.html.

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
//app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// This path is used for queries involving the database
app.get('/dbr', function (req, res) {
  
res.send("Hello this path is working");


});



app.listen(process.env.PORT || 8080);