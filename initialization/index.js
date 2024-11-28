const mongoose = require("mongoose");
const sampleData = require("./init.js");
const Listing = require("../models/listing.js");
const DBurl = "mongodb://127.0.0.1:27017/homescout";

async function main() {
    await mongoose.connect(DBurl);
}

main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})

const initDb = async ()=>{
    // await Listing.deleteMany({});
    sampleData.data = sampleData.data.map((obj)=>({...obj, owner : '6739e43ca0ebe6a78cef3e92',}))
    await Listing.insertMany(sampleData.data);
console.log(sampleData.data);
    console.log("Data inserted");
}

// initDb();