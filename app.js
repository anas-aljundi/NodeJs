const logger = require('./logger.js');
const path = require('path');
const os = require('os');
const fs = require('fs');

var pathObj = path.parse(__filename);
var mem= os.totalmem;
var files = fs.readdirSync('./');
 fs.readdir('./', (err, file) => {
    if (err) {
        console.log('Error', err);
    } else {
        console.log('Result', file);
    }
});
// console.log('Sync Files');
// console.log(files);
// console.log('Async Files');
// console.log(files2);
// console.log(pathObj);
// console.log('total memory' + mem);
// console.log(logger);
// logger.log();