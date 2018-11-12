const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const inputFiles = require("./takeInputs.js");

function processRawInput() {
    var InputDir = path.join(dataRoot, "/input/");

    return new Promise(function(resolve, reject) {
        fs.readdir(InputDir, (err, files) => {
            if (err) {
                reject(err)
            } else {
                resolve(files);
            }
        })
    }).then((files) => {
        var proms = [];
        for (var n in files) {
            var path = files[n];
            if (path.match(/\.zip$/)) {
                proms.push(new Promise(function() {
                    console.log(path);
                }));
            }
        }
        return new PromiseAll([]);
    });
}

function processFile(relPath) {
    return new Promise(function(resolve, reject) {
        var fullPath = path.join(dataRoot, "/input/", relPath);

    });
}

function processNextFile() {

}

module.exports = {
    inputFiles: inputFiles.takeInputs,
    unzip: inputFiles.unzip,
    break: inputFiles.breakInputs,
}