
const User = require("../models/user.js")

module.exports.renderSignUpForm = (req ,res)=>{
    res.render("users/signup.ejs");
}

module.exports.postUser = async(req ,res)=>{
    let {username , email , password} = req.body;
    const newUser = new User ({email , username});
    const register = await User.register(newUser, password );
    req.login(register,(err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/listings");
    })
    console.log(register);
    res.redirect("/listings");
}

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
}


module.exports.loginUser = async (req,res)=>{
    res.redirect("/listings");
}

module.exports.logOutUser = (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        res.redirect("/listings");
    })
}