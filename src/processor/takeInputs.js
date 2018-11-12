const path = require('path');
const fs = require('fs');
const util = require('util');
const fileUpload = require('express-fileupload');
const unzipper = require('unzipper');

const webSocket = require("../routing/websocket");

const inputPath = path.join(dataRoot, "/input/");
const clearedPath = path.join(dataRoot, "/cleared");
const workingInput = path.join(dataRoot, "/working/input/");

const listFiles = util.promisify(fs.readdir);
const mvFile = util.promisify(fs.rename);
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
})
module.exports = {
    takeInputs: (req) => {
        initializer.verifyDirectories();
        var promises = [];
        var files = req.files.fileToUpload;
        if (files.name) {
            files = [files];
        }
        for (i in files) {
            var file = files[i];
            console.log(i + ": " + file.name);
            promises.push(file.mv(path.join(inputPath, file.name)));
        }
        return Promise.all(promises).then(_ => {
            initializer.verifyDirectories();
            return _;
        });
    },
    unzip: () => {
        initializer.verifyDirectories();
        var proms = [];
        proms[0] = util.promisify(fs.readdir)(inputPath).then(files => {
            for (var i in files) {
                var inFile = path.join(inputPath, files[i]);
                var clearFile = path.join(clearedPath, files[i]);
                proms.push(util.promisify(fs.copyFile)(inFile, clearFile));
            }
        });
        return Promise.all(proms).then(_ => {
            return unfoldFile(inputPath);
        }).then(_ => {
            initializer.verifyDirectories();
            return _;
        });
    },
    breakInputs: () => {

    }
}

/**
 * 
 * @param {string} filePath 
 * @returns {Promise}
 */
function unfoldFile(filePath) {
    filePath = path.resolve(filePath);
    log("Trying to unfold File: " + filePath);
    var basename = path.basename(filePath);
    var outPath = path.join(workingInput, "/", basename.replace(".zip", ""));
    return util.promisify(fs.stat)(filePath)
        .then((stats) => {
            var innerFiles = [];
            var prom;
            if (stats.isDirectory()) {
                prom = listFiles(filePath).then(fileNames => {
                    var promises = [];
                    log(`Trying to take files [${fileNames.join(",")}] from directory ${filePath}`);
                    for (var i in fileNames) {
                        var n = fileNames[i];
                        var subPath = path.join(filePath, n);
                        promises.push(unfoldFile(subPath));
                    }
                    return Promise.all(promises).then((vals) => {
                        for (var i in vals) {
                            for (var j in vals[i]) {
                                innerFiles.push(vals[i][j]);
                            }
                        }
                    });
                }).then(_ => {
                    log("Directory " + filePath + " Emptied, removing directory");
                    fs.rmdirSync(filePath);
                    return _;
                }).then(_ => {
                    log("Directory " + filePath + " Deleted.");
                });
            } else if (basename.match(/.zip$/)) {
                prom = new Promise((resolve, reject) => {
                    try {
                        var reader = fs.createReadStream(filePath);
                        reader.pipe(unzipper.Extract({ path: outPath })).on('close', resolve);
                        //resolve();
                    } catch (err) {
                        reject(err);
                    }
                }).then(_ => {
                    log("File " + filePath + " Unzipped to " + outPath);
                    return util.promisify(fs.unlink)(filePath);
                }).then(_ => {
                    return unfoldFile(outPath);
                }).then(val => {
                    for (var i in val) {
                        innerFiles.push(val[i]);
                    }
                });
            } else {
                prom = mvFile(filePath, path.join(workingInput, basename)).then(_ => {
                    log("File " + filePath + " Moved to " + outPath);
                });
                innerFiles.push(basename);
            }
            return prom.then(_ => { return innerFiles });
        });
}

function log(msg) {
    webSocket.sendLog(msg);
}