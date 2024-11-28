const Listing = require("./models/listing.js")

module.exports.isloggedin = (req , res, next)=>{
    if(!req.isAuthenticated()){
        // req.flash("erorr","You must login first");
        return res.redirect("/login");
    }
    next();
}

module.exports.isOwner = async (req , res, next)=>{
    let { id } = req.params;
    let update = await Listing.findById(id);
    if(!update.owner.equals(res.locals.currUser._id)){
        res.redirect(`/listings/${id}`);
    }
    next();
}