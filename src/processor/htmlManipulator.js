const fs = require('fs');
const path = require('path');
const util = require('util');
const jquery = require('jquery');
const JSDOM = require('jsdom').JSDOM;
const bsplit = require('buffer-split');

const Scene = require('./../models/scene.js').Scene;
const shortID = utilities.getShortID;

/**
 * @param filePath {String} - the path to the .html document
 * @return Promise
 */
function getScenes(filePath) {
    var FullHtmlString = fs.readFileSync(filePath).toString().replace(/\<html\>|\<\/html\>/g, "");
    var headAndBody = bsplit(FullHtmlString, "</head>", true);
    var body = headAndBody[1];
    var scenes = body.split("<hr>");
    for (var i in scenes) {
        console.log(i + " - " + shortID());
        var dom = new JSDOM(scenes[i]);
        var $ = jquery(dom.window);
        var title = $(".title").text();
        var speaker = $(".subtitle").text();
        console.log(title + " - " + speaker);
    }
}

module.exports = {
    getScenes: getScenes,
}