// the server and main application 

// the include connection.js to join and connecting database 
require("../dbs/connection")

// include module express
const express = require("express")
const app = express();

// to include or required Student Collection to add the json format object , save the 
// information from database 
const Student = require('../dbs/models/Student')

// const validator = require('validator')
const port = process.env.port || 8000;

// here the data of post request is the json format than use express.json() 
// In DOM, req.body content its the converting json format and save database
app.use(express.json());

// get request 
app.get('/students',(req,res)=>{

    // all field send as response if promise is true than call else catch execute 
    Student.find().then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(404).send(`404 Not Found \n ${err}`)
    })
})


// its request to server add the data of student enroll 
app.post('/students',(req,res)=>{

    //the posting data (in json format) through req.body as args to Student collection 
    // and save the database if data vaildate 
    const studentToJoin = new Student(req.body);

    // console.log(req.body)
    
    // save Student collection field 
    studentToJoin.save().then((r)=>{
        res.status(201).send(r)
    }).catch((err)=>{
        res.status(400).send(err)
    })
    

})

// server start 
app.listen(port,()=>{
    console.log(`server running at ${port}`);
})

