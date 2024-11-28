const Listing = require("../models/listing");
const Review = require("../models/review")
 
module.exports.postReview = async (req ,res)=>{
    let {id} = req.params;
    let newListing =  await Listing.findById(id);
    let rating = new Review (req.body.review);

    newListing.reviews.push(rating);

    await rating.save();
    await newListing.save();

    res.redirect(`/listings/${newListing._id}`);
}

module.exports.destroyReview = async(req ,res)=>{
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull: {reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}