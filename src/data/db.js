const Sequilize = require('sequelize');
//const DummyDB = require('./models/dummyDB.js');
const Sources = {
    Person: require('./models/person.js'),
    Pet: require('./models/pet.js'),
}

const dbInfo = {
    dialect: 'sqlite',
    storage: appRoot + "/data/dummy.sqlite",
};
const tableOptions = {
    freezeTableName: true,
    paranoid: true,
    underscored: true
}

var Associations = [{
    first: "Pet",
    second: "Person",
    relation: "1-1",
    id: "owner",
}]

/** @type {Object.<string, Sequilize.Model>} */
var Models = {}

const DB = new Sequilize(dbInfo);

for (m in Sources) {
    Models[m] = DB.define(m, Sources[m].model, tableOptions);
}

Models.Pet.belongsTo(Models.Person, { as: "Owner" });
DB.sync().then(() => {
    for (m in Sources) {
        var seeds = Sources[m].seeds;
        if (seeds) {
            Models[m].bulkCreate(seeds);
        }
    }
});

module.exports = {
    //getTables: () => { return ["person", "pet"] },
    getTables: () => { return Sources.keys() },
    getAllFrom: (table) => {
        if (Sources[table]) {
            return Models[table].findAll({});
        }
        return null;
    },
    getDB: () => { return DB }
};