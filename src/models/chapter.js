const Scene = require('./scene').Scene;
const Book = require('./scene').Book;

class Chapter {
    constructor() {
        this._scenes = [];
    }
    addScene(input) {
        if (input instanceof Scene) {
            _scenes.push(input);
        }
    }
}

module.exports = {
    Chapter: Chapter,
}