'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoTasks = [
  {
    text: 'First Task',
    priority: 'Medium',
    userId: 1
  },
  {
    text: 'Second Task',
    priority: 'Low',
    userId: 1
  },
  {
    text: 'Third Task',
    priority: 'High',
    userId: 1
  },
  {
    text: 'Fourth Task',
    priority: 'Low',
    userId: 2
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Tasks';
    return queryInterface.bulkInsert(options, demoTasks);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Tasks';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, demoTasks)
  }
};
