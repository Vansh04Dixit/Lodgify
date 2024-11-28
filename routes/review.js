const express = require("express");
const router = express.Router({mergeParams : true});
const ExpressErorr = require("../utils/ExpressErorr.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggedin } = require("../middleware.js");
const reviewController = require("../controllers/review.js")
const {reviewSchema}  = require("../schema.js");

const validateReview = (req , res, next)=>{
    let {erorr} = reviewSchema.validate(req.body);
    if(erorr){
        throw new ExpressErorr(404 , result.erorr);
    }
    else{
        next();
    }
}

//POST REVIEW 
router.post("/", validateReview, isloggedin, wrapAsync(reviewController.postReview))

//DELETE REVIEW 
router.delete("/listings/:id/review/:reviewId",isloggedin, wrapAsync(reviewController.destroyReview))

module.exports = router;