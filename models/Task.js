const Sequelize = require('sequelize');
const db = require('../config/db');

const Task = db.define('tasks', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  project_id: {
    type: Sequelize.INTEGER(11)
  },
  name: Sequelize.STRING(100),
  completed: Sequelize.INTEGER(1)
});

module.exports = Task;