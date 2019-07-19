const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index',{title: 'Template Engine', message: 'Hello template engine'});
});

module.exports = router;