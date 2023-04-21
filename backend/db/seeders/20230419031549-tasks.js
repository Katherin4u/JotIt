'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoTasks = [
  {
    title: 'First Task',
    text: 'First Task Text',
    priority: 'Medium',
    userId: 1
  },
  {
    title: 'Second Task',
    text: 'Second Task Text',
    priority: 'Low',
    userId: 1
  },
  {
    title: 'Third Task',
    text: 'Third Task Text',
    priority: 'High',
    userId: 1
  },
  {
    title: 'Fourth Task',
    text: 'Fourth Task Text',
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
