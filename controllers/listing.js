const Listing = require("../models/listing.js")

module.exports.index = async (req , res)=>{
    const list = await Listing.find({});
    // console.log("listing is:",list);
    res.render("listing/index.ejs", {list});
}

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
}

module.exports.showListing = async (req ,res)=>{
    let {id} = req.params;
    // console.log(id);
    const data = await Listing.findById(id).populate("reviews").populate("owner");
    // console.log(data);
    res.render("listing/show.ejs", {data})
}

module.exports.createListing = async (req , res)=>{
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    await newlisting.save();
    // req.flash("success","Your listing is created");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req ,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs", {listing});
}

module.exports.updateListing = async (req ,res) =>{
    let { id } = req.params;
    let update = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    // console.log(update);
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req , res)=>{
    let { id } = req.params;
    const del = await Listing.findByIdAndDelete(id);
    // console.log(remove);
    res.redirect("/listings");
}