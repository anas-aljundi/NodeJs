const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 256
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10124
    },
    isAdmin: Boolean
});

userSchema.methods.getAuthToken = function() {
    const token = jwt.sign({ _id: this._id, email: this.email, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().required().min(3).max(256),
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    };

    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;