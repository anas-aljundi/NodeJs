const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Genre, validateGenre} = require('../models/genre');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort({name:1});
    res.send(genres);
});

router.post('/', auth, async (req, res) => {
    const {error} = validateGenre(req.body);
    if (error)  return res.status(400).send(error.details[0].message);
    const genre = new Genre({
        name: req.body.name
    });
    await genre.save();
    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    if (!genre) return res.status(404).send('the genre with the given ID was not found.');

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('the genre with the given ID was not found');

    res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('the genre with the given ID was not found try again');

    res.send(genre);
});

module.exports = router;