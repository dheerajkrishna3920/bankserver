//import express

const express = require("express")


//import jwt
const jwt = require('jsonwebtoken')


//app(server) creation

const app = express()


//import logic file

const logic = require('./service/logic')



// integrate frontend with server

const cors = require('cors')
app.use(cors({ origin: 'http://localhost:4200' }))



//to convert all incoming json data in to js

app.use(express.json())



//middleware creation

const jwtMiddleware = (req, res, next) => {
    console.log("........middleware.....");


    try {//acess token from request header

        const token = req.headers['acess_token']

        //verify
        jwt.verify(token, "secretkey123")

        next()
    }
    catch {
        res.status(404).json({
            statusCode: 404,
            status: false,
            message: "Unauthorized user"
        })
    }

}



//app.get('/getdata',(req,res)=>{
//  console.log(req.body.acno);
//res.send("get method...")
//})

//to convert all outcoming js data in to json and send response

app.get('/getdata', (req, res) => {
    //console.log(req.body.acno);
    res.json(req.body.acno)
})






//request register

app.post('/register', (req, res) => {

    logic.register(req.body.acno, req.body.uname, req.body.psw).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//login request

app.post('/login', (req, res) => {

    logic.login(req.body.acno, req.body.psw).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//balance
app.get('/balance/:acno', jwtMiddleware, (req, res) => {
    logic.getBalance(req.params.acno).then(result => {
        res.status(result.statusCode).json(result)
    })

})

//singleuser
app.get('/getUser/:acno', jwtMiddleware, (req, res) => {
    logic.getUser(req.params.acno).then(result => {
        res.status(result.statusCode).json(result)
    })

})

//fund transfer

app.post('/transfer', jwtMiddleware, (req, res) => {
    logic.fundTransfer(
        req.body.toAcno,
        req.body.fromAcno,
        req.body.amount,
        req.body.psw,
        req.body.date
    )
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//transaction history

app.get('/transaction/:acno', jwtMiddleware, (req, res) => {
    logic.getTransaction(req.params.acno).then(result => {
        res.status(result.statusCode).json(result)
    })
})


app.delete('/deleteAc/:acno', jwtMiddleware, (req, res) => {
    logic.deleteAc(req.params.acno).then(result => {
        res.status(result.statusCode).json(result)
    })
})



//port set
app.listen(3000, () => {
    console.log("server started at port 3000");
})