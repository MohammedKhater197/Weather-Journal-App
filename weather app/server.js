 // Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const cors = require('cors'); 
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Initialize all route with a callback function

// Setup Server
const port =4444 ;
app.listen(port, () => {
    console.log(`Server Running On: http://localhost:${port}`);
});
// Callback function to complete GET '/all'
//get
app.get('/all', (req, res) => {
    res.send(projectData);
    
});
 //post
 // Post Route
  
 app.post('/add', addData)  
 function addData(req,res){

  console.log(req.body); 
    //Post Data Now
    newEntry={
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    projectData= newEntry;
    res.send(projectData);
};
