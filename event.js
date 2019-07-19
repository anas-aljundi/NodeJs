const EventEmitter = require('events');
//const emitter = new EventEmitter();

const Logger = require('./logger.js');
const logger = new Logger();
logger.on('messageLogged', (arg) => {
    console.log('event raised successfully', arg);
});
logger.log('message');