const mongoose = require('mongoose')
require('dotenv').config()
const DB = 'mongodb://rahul:rahul@ac-metwcnz-shard-00-00.ytwybs1.mongodb.net:27017,ac-metwcnz-shard-00-01.ytwybs1.mongodb.net:27017,ac-metwcnz-shard-00-02.ytwybs1.mongodb.net:27017/?ssl=true&replicaSet=atlas-3qzgej-shard-0&authSource=admin&retryWrites=true&w=majority'
const accountSid = "AC01c5b97d2812c77aab3df90f463d8664";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.YOUR_VERIFY_SID;
const client = require("twilio")(accountSid, authToken);

mongoose.set('strictQuery', false);
mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection successfull");
 }).catch((e) => console.log("No connection"+e))


const connection= mongoose.connection
const userSchema = new mongoose.Schema(
    { name: String, mobile: String, coupon:String }
)
const User = mongoose.model('User', userSchema);

const loginController = async(req, res)=>{
    const { coupon, mobile, name } = req.body;

    newMob= '+91'+mobile
    console.log(newMob)
    console.log(req.body)
   
const user = await User.create({mobile:mobile,name:name})
await user.save()

User.find({ coupon: coupon}, function (err, docs) {
    let couponLength = docs.length
 
    if (docs.length>0){
        client.verify.v2
        .services(verifySid)
        .verifications.create({ to: newMob, channel: "sms" })
        .then((verification) => console.log(verification.status))
        
    }
    else{
    // console.log("First function call : ", docs);
    // console.log("First function call : ", docs.length);
    console.log('i am rahul')
    
    }
    res.status(200).send({
        message:'Data send sucessfully',
        length:couponLength
    })

});

}



module.exports = loginController
