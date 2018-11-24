var Chapter = require("./chapter.js").Chapter;
const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');
const path = require('path');
const util = require('util');

class Scene {
    /**
     * 
     * @constructor
     * @param {fs.PathLike | Buffer} text Buffer or other not PathLike will create new scene,
     * PathLike will ignore prevScene and pull up an existing Scene
     * @param {Scene} [prevScene]
     */
    constructor(text, prevScene) {
        if (text.length < 30) {
            this.initializeExisting(text);
        } else {
            this.initializeNew(text, prevScene);
        }
    }
    initializeExisting(id) {

    }
    initializeNew(text, prevScene) {
        /**@type {Chapter} */
        var chapter;
        var speaker;
        if (prevScene) {
            chapter = prevScene.chapter;
            speaker = prevScene.speaker;
        }

        var dom = new JSDOM(text);
        var $ = jquery(dom.window);
        var elTitle = $(".title");
        var elSubTitle = $(".subtitle");
        if (elTitle.length) {
            chapter = new Chapter(elTitle.text());
        } else if (!prevScene) {
            chapter = new Chapter();
        }
        if (elSubTitle) {
            speaker = elSubTitle.text();
        }

        this.chapter = chapter;
        this.speaker = speaker;
    }

    get id() {
        if (!this._id) {
            this._id = utilities.getShortID();
        }
        return this._id;
    }
    set id(i) {
        this._id = i;
    }
    get location() {
        return path.join(dataRoot, "/working/scenes/", this.id, ".html");
    }
    get text() {
        var isFilePath = fs.existsSync(this.location);
        if (!isFilePath) {
            throw "File Does Not Exist!";
        } else {
            return fs.readFileSync(this.location);
        }
    }

    /** @param {Buffer | String} input */
    set text(input) {
        var isFilePath = fs.existsSync(input);
        if (isFilePath) {
            this._text = fs.readFileSync(input).toString();
        } else {
            this._text = Buffer.toString();
        }
    }

    get speaker() { return this._speaker; }
    get chapter() { return this._chapter; }
    get book() { return this._chapter.book; }
    set speaker(input) { this._speaker = input; }

    /** @param {Chapter} input */
    set chapter(input) {
        if (input instanceof Chapter) {
            if (this._chapter) {
                this._chapter.removeScene(this);
            }
            this._chapter = input;
            input.addScene(this);
        } else {

        }
    }
}

module.exports = {
    Scene: Scene,
}