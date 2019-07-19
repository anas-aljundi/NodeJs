const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const Joi = require('joi');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const log = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

app.engine('pug', require('pug').__express)
app.set('view engine', 'pug');
app.set('views', './views');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(log);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
// console.log(`Mail password: ${config.get('mail.password')}`);
dbDebugger('connected to db .....');


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listing on port ${port} ...`));