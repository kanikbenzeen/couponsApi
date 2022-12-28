require('dotenv').config()
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.YOUR_VERIFY_SID;
const accountSid = "AC01c5b97d2812c77aab3df90f463d8664";
const client = require("twilio")(accountSid, authToken);
const DB = 'mongodb://rahul:rahul@ac-metwcnz-shard-00-00.ytwybs1.mongodb.net:27017,ac-metwcnz-shard-00-01.ytwybs1.mongodb.net:27017,ac-metwcnz-shard-00-02.ytwybs1.mongodb.net:27017/?ssl=true&replicaSet=atlas-3qzgej-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.connect(DB, function(err){
      if(!err){
          console.log("no error!")
      }
  });
  const doc = mongoose.model('users', new Schema(
      {name : String})
  )

  let alldata 
  doc.findOne({}, function(err,collection){ 
      alldata=collection
      console.log(collection)

    });


const verifyController = (req, res)=>{
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