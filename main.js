const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1:27017/homescout";
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressErorr = require("./utils/ExpressErorr.js");
const session = require("express-session");
const flash = require("connect-flash");
const review = require("./models/review.js");
const passport = require("passport");
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const user = require("./routes/user.js");

async function main(){
    await mongoose.connect(mongoUrl)
}

main().then(()=>{
    console.log("Connection sucessfull to db");
}).catch((err)=>{
    console.log(err);
})

const sessionOption = {
    secret : "mycode",
    resave : false,
    saveUninitialized : true,
    cokkies : {
        expires : 7 * 24 * 60 * 60 *1000,
        maxAge :  7 * 24 * 60 * 60 *1000,
        httpOnly : true,
    }
}

app.use(flash());
app.use(session(sessionOption));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public')); 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

app.use((req ,res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.currUser = req.user;
    next();
})

app.use("/listings", listings)
app.use("/listings/:id/reviews", reviews);
app.use("/", user);

app.all("*",(req ,res, next)=>{
    next(new ExpressErorr(404 , "Page not found"));
})

app.use((err , req, res, next)=>{
    res.render("erorr.ejs");
})

app.listen(port , ()=>{
    console.log(`App is listening to port ${port}`);
})