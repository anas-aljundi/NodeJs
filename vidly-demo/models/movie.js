const mongoose = require('mongoose');
const Joi = require('joi');
const {GenreSchema} = require('./genre');


const MovieSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true, minlength: 3 , maxlength: 256},
    genre: {
        type: GenreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min:0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min:0,
        max:255
    }
})
const Movie = mongoose.model('movie', MovieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().required().min(3).max(256),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };

    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.MovieSchema = MovieSchema;
module.exports.validate = validateMovie;