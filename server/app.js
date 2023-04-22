const env = require('dotenv');
const express = require('express');
const app = express();

env.config({path:'./config.env'})
// require('./db/conn');
app.use(express.json());
// const user = require('./model/userSchema');

app.use(require('./router/auth'));

const port = process.env.PORT;

//! middleware
// const middleware = (req,res,next) =>{
//     console.log("this is middleware");
//     next();
// }

// app.get('/',(req,res)=>{
//     res.send("home")
// });
// app.get('/about', (req,res)=>{
//     res.send("about")
// });
// app.get('/contact',(req,res)=>{
//     res.send("contact")
// });
// app.get('/signin',(req,res)=>{
//     res.send("signin")
// });
// app.get('/signup',(req,res)=>{
//     res.send("signup")
// });

app.listen(port,()=>{
    console.log(`connected to port ${port}`);
});