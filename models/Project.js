const Sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');
const db = require('../config/db');

const Project = db.define('projects', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.INTEGER(11)
  },
  name: {
    type: Sequelize.STRING(100)
  },
  url: Sequelize.STRING(100)
}, {
  hooks: {
    beforeCreate(project){
      const url = slug(project.name).toLocaleLowerCase();
      //console.log('before create record');
      project.url = `${url}-${shortid.generate()}`;
    },
    // beforeUpdate(project){
    //   const url = slug(project.name).toLocaleLowerCase();
    //   //console.log('before create record');
    //   project.url = `${url}-${shortid.generate()}`;
    // }
  }
});

module.exports = Project