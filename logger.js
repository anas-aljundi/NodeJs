const EventEmitter = require('events');
var url = 'https://www.google.com';

class Logger extends EventEmitter {

    log(message) {
        console.log('Redirection ' + message);
        console.log(url);
        this.emit('messageLogged', {id: 1, url:'https://www.codewithmosh.com/'});
    }
}

module.exports = Logger;