const express = require('express');
const router = express.Router();
const {Rental, validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');
const mongoose = require('mongoose');
const Fawn = require('fawn');

//Two phases commite(transaction in SQL)
Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res. status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send('The customer with the given ID was not found');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send('The movie with the given ID was not Found');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not avaliable this time');
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    
    //it's risk to fail save on of them must use two phase commite
    // rental = await rental.save();
    
    // movie.numberInStock--;
    // movie.save();

    try{
        new Fawn.Task().save('rentals', rental)
                   .update('movies', {_id: movie._id}, {
                       $inc: {numberInStock: -1}
                   })
                   .run();

    res.send(rental);
    }
    catch(ex) {
        res.status(500).send(ex.message);
    }
});

module.exports = router;