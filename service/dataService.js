//  Import jsonwebtoken

const jwt=require('jsonwebtoken')

 userDetails={
    1000:{acno:1000,username:"Rinshad",password:123,balance:0,transaction:[]},
    1001:{acno:1001,username:"Amal",password:123,balance:0,transaction:[]},
    1002:{acno:1002,username:"Arun",password:123,balance:0,transaction:[]},
    1010:{acno:1010,username:"Saneen",password:123,balance:0,transaction:[]}
  }

// Register
register=(acno,uname,psw)=>{
    if (acno in userDetails){
      return {
        statusCode:401,
        status:false,
        message:"User Already Exist"
      }
    }
    else{
      userDetails[acno]={acno,usernae:uname,password:psw,balance:0,transaction:[]}
      return {
        statusCode:200,
        status:true,
        message:"Registration Success"
      }
    }
}    

// Login

login=(acno,psw)=>{

  if(acno in userDetails){
    if(psw==userDetails[acno]["password"]){
      const token=jwt.sign({currentAcno:acno},'secretkey123')
      return {
        statusCode:200,
        status:true,
        message:"Login Success",
        token
      }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:"Incorrect Password"
      }
    }
  }
  else{
    return {
      statusCode:401,
      status:false,
      message:"Incorrect Account Number"
    }
  }
}

deposit=(acno,password,amount)=>{
  var amnt=parseInt(amount)
  if(acno in userDetails){
    if(password==userDetails[acno]["password"]){
      userDetails[acno]["balance"]+=amnt
      userDetails[acno]['transaction'].push({type:'CREDIT',amount:amnt})
      return {
        statusCode:200,
        status:true,
        message:userDetails[acno]["balance"]
      }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:"Incorrect Password"
      }
    }
  }
  else{
    return {
      statusCode:401,
      status:false,
      message:"Incorrect Account Number"
    }
  }

  }
  withdraw=(acno,password,amount)=>{
    var amnt=parseInt(amount)
    if(acno in userDetails){
      if(password==userDetails[acno]['password']){
        if(amnt<=userDetails[acno]['balance']){
          userDetails[acno]['balance']-=amnt
          userDetails[acno]['transaction'].push({type:'DEBIT',amount:amnt})
          return {
            statusCode:200,
            status:true,
            message:userDetails[acno]["balance"]
          }
        }
        else{
          return {
            statusCode:401,
            status:false,
            message:'Insufficient Balance'
          }
        }
      }
      else{
        return {
          statusCode:401,
          status:false,
          message:'Incorrect Password'
        }
      }
      
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:'Incorrect Account Number'
      }
    }
  }
  gettransaction=(acno)=>{
    if(acno in userDetails){
      return{
        statusCode:200,
        status:true,
        message:userDetails[acno]["transaction"]
      }
    }
    return { statusCode:401,
    status:false,
    message:'Incorrect Account Number'
  }
}

module.exports={
    register,
    login,
    deposit,
    withdraw,
    gettransaction
}