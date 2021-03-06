const Joi = require('joi');
const moment = require('moment');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();


router.post('/', [auth, validate(validateReturn)], async (req, res) => {

    // Replace the validation by Middleware
    /* if(!req.body.customerId) return res.status(400).send('customer Id not provided');

    if(!req.body.movieId) return res.status(400).send('movie Id not provided'); */

    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if(!rental) return res.status(404).send('Rental Not Found');

    if(rental.dateReturned) return res.status(400).send('the rental already processed');

    // Instance Method,I created 
    rental.return();

    await rental.save();
    
    await Movie.update({_id: rental.movie._id}, {
        $inc: { numberInStock: 1}
    });

    return res.send(rental);
});

function validateReturn(req) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };
    return Joi.validate(req, schema);
}

module.exports = router;