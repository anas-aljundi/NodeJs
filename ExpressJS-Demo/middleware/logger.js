function logger(req, res, next) {
    console.log('Logging and Authinticating...');
    next();
}

module.exports = logger;