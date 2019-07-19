const mongoose = require('mongoose');
const Joi = require('joi');

const CustomerSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 256, lowercase: true},
    phone: {type: Number, required: true},
    isGold: Boolean
})
const Customer = mongoose.model('Customer', CustomerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().required().min(3).max(256),
        phone: Joi.number().required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

module.exports.Customer= Customer;
module.exports.CustomerSchema = CustomerSchema;
module.exports.validate= validateCustomer;