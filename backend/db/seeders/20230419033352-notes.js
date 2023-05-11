'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoNotes = [
  {
    title: 'First Note',
    subtitle: 'This is your First Note',
    text: 'First Note Text',
    userId: 1,
    notebookId: 1,
  },
  {
    title: 'Second Note',
    subtitle: 'This is your Second Note',
    text: 'Second Note Text',
    userId: 2,
    notebookId: 1,
  },
  {
    title: 'Third Note',
    subtitle: 'This is your Third Note',
    text: 'Third Note Text',
    userId: 1,
    notebookId: 2,
  },
  {
    title: 'Fourth Note',
    subtitle: 'This is your Fourth Note',
    text: 'Fourth Note Text',
    userId: 2,
    notebookId: 2,
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Notes';
    return queryInterface.bulkInsert(options, demoNotes);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Notes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, demoNotes)
  }
};
