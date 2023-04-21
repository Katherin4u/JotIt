'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoTagTasks = [
  {
    tagId: 1,
    taskId: 1,
  },
  {
    tagId: 2,
    taskId: 1,
  },
  {
    tagId: 3,
    taskId: 1,
  },
  {
    tagId: 1,
    taskId: 2,
  },
  {
    tagId: 3,
    taskId: 3,
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'TagTasks';
    return queryInterface.bulkInsert(options, demoTagTasks);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'TagTasks';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, demoTagTasks)
  }
};
