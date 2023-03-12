// Import cors
const cors=require('cors')


// Import dataService file from service folder
const dataservice = require('./service/dataService')

// Import jsonwebtoken
const jwt = require('jsonwebtoken')

// Import express
const express = require('express')
const { json } = require('express')

// Create app
const app = express()

// Connect frontend
app.use(cors({origin:'http://localhost:4200'}))

// To convert json datas
app.use(express.json())


// Middleware for verify the token
const jwtmiddleware = (req, res, next) => {
    console.log(".........Middleware Success...........");
    try {
        const token = req.headers['access-token']
        const data = jwt.verify(token, "secretkey123")
        console.log(data);
        next()
    }
    catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: 'Please Login First'
        })
    }
}

// Request

// Register
app.post('/register', (req, res) => {

    dataservice.register(req.body.acno, req.body.uname, req.body.psw).then(result => {
        res.status(result.statusCode).json(result)
    })


})

// Login
app.post('/login', (req, res) => {

    dataservice.login(req.body.acno, req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)

    })

})
// Deposit
app.post('/deposit', jwtmiddleware, (req, res) => {

    dataservice.deposit(req.body.acno, req.body.psw, req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)

    })

})
// Withdraw
app.post('/withdraw', jwtmiddleware, (req, res) => {

    dataservice.withdraw(req.body.acno, req.body.psw, req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)

    })

})

// Transaction History
app.post('/gettransaction', jwtmiddleware, (req, res) => {

    dataservice.gettransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)

    })

})

// Delete
app.delete('/deleteacc/:acno',jwtmiddleware,(req,res)=>{
    dataservice.acdelete(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

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
