const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggedin , isOwner } = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");

//INDEX ROUTE
router.route("/").get(wrapAsync(listingcontroller.index))
.post( isloggedin ,wrapAsync(listingcontroller.createListing))

//CREATE ROUTE
router.get("/new", isloggedin, listingcontroller.renderNewForm);

//SHOW ROUTE
router.route("/:id").get(wrapAsync(listingcontroller.showListing))
.put(isloggedin , isOwner ,wrapAsync(listingcontroller.updateListing))
.delete(isloggedin , wrapAsync(listingcontroller.destroyListing))

//EDIT ROUTE
router.get("/:id/edit", isOwner , isloggedin ,wrapAsync(listingcontroller.renderEditForm))

module.exports = router;