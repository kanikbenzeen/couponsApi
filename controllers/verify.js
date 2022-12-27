require('dotenv').config()
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.YOUR_VERIFY_SID;
const accountSid = "AC01c5b97d2812c77aab3df90f463d8664";
const client = require("twilio")(accountSid, authToken);

const verifyController = (req, res)=>{
const {mobile, otp} = req.body
let newMob = "+91"+mobile
let flag
client.verify.v2.services(verifySid)
      .verificationChecks
      .create({to: newMob, code:otp })
      .then(verification_check => console.log(flag=verification_check.status))
      .then(()=>{
            res.status(200).send({verify:flag})
      })
    
}


module.exports = verifyController