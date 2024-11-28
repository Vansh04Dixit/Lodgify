const { string, date } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

async function main() {
    mongoose.connect("")
}

const reviewSchema = new Schema({
    comment : String,
    rating : {
        type : Number,
        min : 1,
        max : 5,
    },
    cratedAt : {
        type : Date,
        default: Date.now()
    },
    author: {
        type : Schema.Types.ObjectId,
        ref : "User",
    }
});

module.exports = mongoose.model("Review", reviewSchema);