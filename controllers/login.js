const mongoose = require('mongoose')
require('dotenv').config()
// const DB = 'mongodb://rahul:rahul@ac-metwcnz-shard-00-00.ytwybs1.mongodb.net:27017,ac-metwcnz-shard-00-01.ytwybs1.mongodb.net:27017,ac-metwcnz-shard-00-02.ytwybs1.mongodb.net:27017/?ssl=true&replicaSet=atlas-3qzgej-shard-0&authSource=admin&retryWrites=true&w=majority'
const DB = 'mongodb://klientsure:pnp2668384@ac-xwqjhkr-shard-00-00.ar6nikh.mongodb.net:27017,ac-xwqjhkr-shard-00-01.ar6nikh.mongodb.net:27017,ac-xwqjhkr-shard-00-02.ar6nikh.mongodb.net:27017/?ssl=true&replicaSet=atlas-u3am8l-shard-0&authSource=admin&retryWrites=true&w=majority'
// const accountSid = "AC01c5b97d2812c77aab3df90f463d8664";
// const accountSid = "AC2f7faa89075ffbf79f157f8988a044fa";
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.YOUR_VERIFY_SID;
const client = require("twilio")(accountSid, authToken);

mongoose.set('strictQuery', false);
mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection successfull");
 }).catch((e) => console.log("No connection"+e))




const connection= mongoose.connection
const userSchema = new mongoose.Schema(
    { name: String, mobile: String, coupon:String, discount:String, createdAt:{ type:Date, default:Date.now()} }
)

const couponSchema = new mongoose.Schema(
    {couponcode:String, discount:String }
)

const User = mongoose.model('User', userSchema);
const allCoupons = mongoose.model('allcoupons', couponSchema);
const custome  = async (mobile, name, couponcode, discount)=>{
    console.log(mobile, name)
    const user = await User.create({mobile:mobile,name:name,coupon:couponcode,discount:discount})
     await user.save()
} 

const removeField = async (coupons) =>{
    console.log(`my coupons ${ coupons}`)
    // await allCoupons.find({}).remove({couponcode: coupons})
    allCoupons.findOneAndDelete({couponcode:coupons }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted User : ", docs);
        }
    });
}


const loginController = async(req, res)=>{
    const { coupon, mobile, name } = req.body;

    newMob= '+91'+mobile
    console.log(newMob)
    console.log(req.body)
    // coupon=coupon;
    // mobile=mobile;
    // name=name
    
// const user = await allCoupons.create({allcoupons:coupon})
// await user.save()

allCoupons.find({couponcode: coupon}, function (err, docs) {
   let discount
    let couponLength = docs.length
   docs.map((items)=>{
    let  itemObject = items.toObject()
    discount = itemObject.discount
   })
    // console.log(docs._docs.discount);
    // console.log(docs.discount)
    // let discounts=docs[0].discount
    // console.log(docs._id)
    // console.log(docs[0].dicount)
    if (docs.length>0){
        custome( mobile, name,coupon,discount)
       
        // docs.coupon = coupon;
        // docs.name= name;
        // docs.mobile = mobile
        
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
    removeField(coupon)
});


}



module.exports = loginController

