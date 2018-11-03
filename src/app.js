const sql = require('sqlite3');
const path = require('path');
const fs = require('fs');

global.appRoot = path.join(path.resolve(__dirname), "\\..\\");
if (!fs.existsSync(appRoot + "data")) {
    fs.mkdirSync(appRoot + "data");
}
console.log(appRoot);

const data = require('./data/index.js');
const server = require('./routing/index.js');