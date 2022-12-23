// Import dataService file from service folder
const dataservice = require('./service/dataService')

// Import jsonwebtoken
const jwt = require('jsonwebtoken')

// Import express
const express = require('express')
const { json } = require('express')

// Create app
const app = express()

// To convert json datas
app.use(express.json())


// Middleware for verify the token
const jwtmiddleware = (req, res, next) => {
    console.log(".........Middleware Success...........");
    try {
        const token = req.headers('access-token')
        const data = jwt.verify(token, "secretkey123")
        console.log(data);
        next()
    }
    catch {
      res.status(422).json(  {
            statusCode: 422,
            status: false,
            message: 'Please Login First'
        })
    }
}

// Request

// Register
app.post('/register', (req, res) => {

    const result = dataservice.register(req.body.acno, req.body.uname, req.body.psw)

    res.status(result.statusCode).json(result)
})

// Login
app.post('/login', (req, res) => {

    const result = dataservice.login(req.body.acno, req.body.psw)

    res.status(result.statusCode).json(result)
})
// Deposit
app.post('/deposit', jwtmiddleware, (req, res) => {

    const result = dataservice.deposit(req.body.acno, req.body.psw, req.body.amount)

    res.status(result.statusCode).json(result)
})
// Withdraw
app.post('/withdraw',jwtmiddleware, (req, res) => {

    const result = dataservice.withdraw(req.body.acno, req.body.psw, req.body.amount)

    res.status(result.statusCode).json(result)
})

// Transaction History
app.post('/gettransaction',jwtmiddleware, (req, res) => {

    const result = dataservice.gettransaction(req.body.acno)

    res.status(result.statusCode).json(result)
})

// Delete

// // GET
// app.get('/',(req,res)=>{
//     res.send('GET Method Checking...........')
// })
// // post
// app.post('/',(req,res)=>{
//     res.send('POST Method Checking...........')
// })

// // put
// app.put('/',(req,res)=>{
//     res.send('PUT Method Checking...........')
// })

// // patch
// app.patch('/',(req,res)=>{
//     res.send('PATCH Method Checking...........')
// })

// // delete
// app.delete('/',(req,res)=>{
//     res.send('DELETE Method Checking...........')
// })


// Set Port
app.listen(3000, () => {
    console.log("Server started at port number 3000");
})
