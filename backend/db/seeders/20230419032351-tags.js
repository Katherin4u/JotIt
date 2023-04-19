'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoTags = [
  {
    name: 'First Tag',
    color: 'red',
    userId: 1
  },
  {
    name: 'Second Tag',
    color: 'green',
    userId: 1
  },
  {
    name: 'Third Tag',
    color: 'blue',
    userId: 2
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Tags';
    return queryInterface.bulkInsert(options, demoTags);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Tags';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, demoTags)
  }
};
