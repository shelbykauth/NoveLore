const Sequilize = require('sequelize');
const DummyModel = require('./models/dummy.js');

const dummyDB = new Sequilize('dummy', 'dumdum', {
    dialect: 'sqlite',
    storage: 'database/dummy.sqlite',
    operatorsAliases: false,
});

DummyModel.initialize(dummyDB);