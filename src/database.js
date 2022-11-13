import mongoose from "mongoose";

mongoose.connect("mongodb://192.168.0.7:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
})
.then(db => console.log("DB is connected"))
.catch(err => console.error(err));


