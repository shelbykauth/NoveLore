const path = require('path');
const fs = require('fs');
const config = require('config');

function initialize() {
    global.config = config;
    global.appRoot = path.join(path.resolve(__dirname), "/../../");
    if (!config.has("dataRoot")) {
        global.dataRoot = path.join(appRoot, "/data/");
    } else {
        global.dataRoot = path.join(path.resolve(config.get("dataRoot")), "/data/");
    }
    console.log("appRoot: " + appRoot);
    console.log("dataRoot: " + dataRoot);

    verifyDirectories();
}

function verifyDirectories() {
    checkDir(dataRoot);
    checkDir(path.join(dataRoot, "/cleared"));
    checkDir(path.join(dataRoot, "/input/"));
    checkDir(path.join(dataRoot, "/output/"));
    checkDir(path.join(dataRoot, "/output/scenes"));
    checkDir(path.join(dataRoot, "/output/chapters"));
    checkDir(path.join(dataRoot, "/output/books"));
    checkDir(path.join(dataRoot, "/working/"));
    checkDir(path.join(dataRoot, "/working/input"));
    checkDir(path.join(dataRoot, "/working/scenes"));
    checkDir(path.join(dataRoot, "/working/chapters"));
    checkDir(path.join(dataRoot, "/working/books"));
    checkDir(path.join(dataRoot, "/altVersions/"));
    checkDir(path.join(dataRoot, "/altVersions/scenes"));
    checkDir(path.join(dataRoot, "/altVersions/chapters"));
    checkDir(path.join(dataRoot, "/altVersions/books"));
}

function checkDir(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}
module.exports = {
    initialize: initialize,
    verifyDirectories: verifyDirectories,
}

global.initializer = module.exports;