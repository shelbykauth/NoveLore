const Sequilize = require("sequelize");

function initialize(database) {
    const Person = database.define('user', {
        firstName: Sequilize.STRING,
        lastName: Sequilize.STRING,
        age: Sequilize.INTEGER
    });

    const Pet = database.define('pet', {
        name: Sequilize.STRING,
        species: Sequilize.STRING,
        owner: Person
    });
}

function seed(database) {
    database.sync().then(() => {

    })
}

module.exports({
    initialize: initialize,
    seed: seed
});