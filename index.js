//import express

const express=require("express")


//import logic file

const logic=require('./service/logic')

//app(server) creation

const app=express()


// integrate frontend with server

const cors=require('cors')
app.use(cors({origin:'http://localhost:4200/'}))



//to convert all incoming json data in to js

app.use(express.json())





//app.get('/getdata',(req,res)=>{
  //  console.log(req.body.acno);
    //res.send("get method...")
//})

//to convert all outcoming js data in to json and send response

app.get('/getdata',(req,res)=>{
    console.log(req.body.acno);
    res.json(req.body.acno)
})

//port set

app.listen(3000,()=>{
    console.log("server started at port 3000");
})


//request register

app.post('/register',(req,res)=>{
    
    logic.register(req.body.acno,req.body.uname,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


//login request

app.post('/login',(req,res)=>{

    logic.login(req.body.acno,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})