const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const inputFiles = require("./takeInputs.js");

module.exports = {
    inputFiles: inputFiles.takeInputs,
    unzip: inputFiles.unzip,
    break: inputFiles.breakInputs,
}