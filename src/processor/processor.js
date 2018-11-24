const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const inputFiles = require("./takeInputs.js");
const htmlManip = require("./htmlManipulator.js");

htmlManip.getScenes(path.join(dataRoot, "/working/input/", "Partial23.html"));


module.exports = {
    inputFiles: inputFiles.takeInputs,
    unzip: inputFiles.unzip,
    break: inputFiles.breakInputs,
}