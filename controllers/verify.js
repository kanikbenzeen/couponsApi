require('dotenv').config()
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.YOUR_VERIFY_SID;
const accountSid = "AC01c5b97d2812c77aab3df90f463d8664";
const client = require("twilio")(accountSid, authToken);
// const DB = 'mongodb://rahul:rahul@ac-metwcnz-shard-00-00.ytwybs1.mongodb.net:27017,ac-metwcnz-shard-00-01.ytwybs1.mongodb.net:27017,ac-metwcnz-shard-00-02.ytwybs1.mongodb.net:27017/?ssl=true&replicaSet=atlas-3qzgej-shard-0&authSource=admin&retryWrites=true&w=majority'
// const DB= 'mongodb://klientsure:pnp@2668384@ac-n0c7vrx-shard-00-00.qmwkinz.mongodb.net:27017,ac-n0c7vrx-shard-00-01.qmwkinz.mongodb.net:27017,ac-n0c7vrx-shard-00-02.qmwkinz.mongodb.net:27017/?ssl=true&replicaSet=atlas-flve0a-shard-0&authSource=admin&retryWrites=true&w=majority'
const DB = 'mongodb://klientsure:pnp2668384@ac-xwqjhkr-shard-00-00.ar6nikh.mongodb.net:27017,ac-xwqjhkr-shard-00-01.ar6nikh.mongodb.net:27017,ac-xwqjhkr-shard-00-02.ar6nikh.mongodb.net:27017/?ssl=true&replicaSet=atlas-u3am8l-shard-0&authSource=admin&retryWrites=true&w=majority'

const mongoose = require('mongoose')
const myValue = require('./login')


var Schema = mongoose.Schema;
mongoose.connect(DB, function(err){
      if(!err){
          console.log("no error!")
          console.log(myValue.setCount)
      }
  });
  const doc = mongoose.model('users', new Schema(
      {name : String})
  )

  let alldata 
//   doc.findOne({}, function(err,collection){ 
//       alldata=collection
//       console.log(collection)

//     });
const callDB  = ()=>{
    doc.findOne().sort({$natural: -1}).limit(1).exec(function(err, collection){
        if(err){
            console.log(err);
        }
        else{
           
            console.log(collection)
            alldata=collection
            console.log(collection)
        }
    })
}





const verifyController = (req, res)=>{
callDB()
const {mobile, otp} = req.body
let newMob = "+91"+mobile
let flag
console.log('my all data');
console.log(alldata);

client.verify.v2.services(verifySid)
      .verificationChecks
      .create({to: newMob, code:otp })
      .then(verification_check => console.log(flag=verification_check.status))
      .then(()=>{
            res.status(200).send({
                  verify:flag,
                  alldata:alldata
            })
      })
    
}


module.exports = verifyController