const config = require('config');
const Joi = require ('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const genres = require('./router/genres');
const customers = require('./router/customers');
const movies = require('./router/movies');
const rentals = require('./router/rentals');
const users = require('./router/users');
const auth = require('./router/auth');

if (!config.get('jwtPrivateKey')) {
        console.log('FATAL ERROR!!! jwtPrivateKey is not defined'); 
        process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly').then(() => console.log('connected to MongoDB..'))
        .catch(err => console.error('Couldnot connect to MongoDB...'));



app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));