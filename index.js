const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const login = require('./routes/login') 
const verify = require('./routes/verify') 
const { json } = require('express')
const bodyParser = require("body-parser"); 

app.use(bodyParser.json());
app.use(cors())
app.use(json())
app.use('/login',login)
app.use('/verify/:id',verify)
app.listen(PORT, ()=>{
    console.log(`Server running at port http://localhost:${PORT}..`);
})