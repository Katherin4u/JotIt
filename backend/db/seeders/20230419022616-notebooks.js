'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoNotesbooks = [
  {
    title: 'First Notebook',
    userId: 1
  },
  {
    title: 'Second Notebook',
    userId: 1
  },
  {
    title: 'Third Notebook',
    userId: 2
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Notebooks';
    return queryInterface.bulkInsert(options, demoNotesbooks);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Notebooks';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, demoNotesbooks)
  }
};
