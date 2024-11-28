const Joi = require("joi");
const joi = require("joi");

const listingSchema = joi.object({
    listing : joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
        location : joi.string().required(),
        country : joi.string().required(),
        price : joi.number().required().min(0),
        image : joi.string().required(),
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required,
        comment : Joi.string().required().min(1).max(5),
    }).required()
})