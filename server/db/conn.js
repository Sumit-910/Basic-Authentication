const mongoose = require('mongoose');

// const db = process.env.MONGOURL;

const DB = "mongodb://localhost:27017/tfirst";

mongoose.connect(DB,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}
).then(()=>{
    console.log("conneted to mongodb successfully");
}).catch((err)=>{
    // console.log("could not establish connection to mongodb atlas")
    console.log(err);
});