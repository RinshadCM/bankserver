// Import db.js
const db = require("./db")

//  Import jsonwebtoken

const jwt = require('jsonwebtoken')

userDetails = {
  1000: { acno: 1000, username: "Rinshad", password: 123, balance: 0, transaction: [] },
  1001: { acno: 1001, username: "Amal", password: 123, balance: 0, transaction: [] },
  1002: { acno: 1002, username: "Arun", password: 123, balance: 0, transaction: [] },
  1010: { acno: 1010, username: "Saneen", password: 123, balance: 0, transaction: [] }
}

// Register
register = (acno, uname, psw) => {
  return db.User.findOne({ acno }).then(user => {
    if (user) {
      return {
        statusCode: 401,
        status: false,
        message: "User already exist"
      }
    }
    else {
      const newuser = new db.User({
        acno,
        username: uname,
        password: psw,
        balance: 0,
        transaction: []
      })
      newuser.save()

      return {
        statusCode: 200,
        status: true,
        message: "Registration Success"
      }
    }
  })
}

// Login

login = (acno, psw) => {

  return db.User.findOne({ acno, password: psw }).then(user => {
    if (user) {
      const token = jwt.sign({ currentAcno: acno }, 'secretkey123')
      return {
        statusCode: 200,
        status: true,
        message: "Login Success",
        currentAcno:acno,
        currentUser:user.username,
        token
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: "Incorrect Account Number/Password"
      }
    }
  })
}

deposit = (acno, password, amount) => {
  var amnt = parseInt(amount)

  return db.User.findOne({ acno, password }).then(user => {
    if (user) {
      user.balance += amnt
      user.transaction.push({ type: 'CREDIT', amount: amnt })
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: `${user.balance}`
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: "Incorrect Account Number/Password"
      }
    }
  })
}
withdraw = (acno, password, amount) => {
  var amnt = parseInt(amount)

  return db.User.findOne({ acno, password }).then(user => {
    if (user) {
      if (amnt > user.balance) {
        return {
          statusCode: 401,
          status: false,
          message: 'Insufficient Balance'
        }
      }
      else {
        user.balance -= amnt
        user.transaction.push({ type: 'DEBIT', amount: amnt })
        user.save()
        return {
          statusCode: 200,
          status: true,
          message: `${user.balance}`
        }
      }

    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: 'Incorrect Account Number/Password'
      }
    }
  })
}
gettransaction = (acno) => {

  return db.User.findOne({acno}).then(user => {
    if (user) {
      return {
        statusCode: 200,
        status: true,
        message: user.transaction
      }
    }
    else{
      return {
        statusCode: 401,
        status: false,
        message: 'Incorrect Account Number'
      }
    }
  })

}

acdelete=(acno)=>{
  return db.User.deleteOne({acno}).then(user=>{
    if(user){
      return{
        statusCode: 200,
        status: true,
        message: "Account Deleted"
      }
    }
    else{
      return {
        statusCode: 401,
        status: false,
        message: 'Incorrect Account Number'
      }
    }
  })
}

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  gettransaction,
  acdelete
}