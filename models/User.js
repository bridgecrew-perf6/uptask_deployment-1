const Sequelize = require('sequelize');
const db = require('../config/db');
const bcript = require('bcrypt-nodejs');

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Add a valid email'
      },
      notEmpty: {
        msg: 'Email is required'
      }
    },
    unique: {
      args: true,
      msg: 'User created before'
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password is required'
      }
    }
  },
  token: {
    type: Sequelize.STRING,
  },
  expiration: {
    type: Sequelize.DATE,
  }
}, {
  hooks: {
    beforeCreate(user){
      user.password =  bcript.hashSync(user.password, bcript.genSaltSync(10));
    }
  }
})

// customs methods
User.prototype.verifyPassword = function(password){
  return bcript.compareSync(password, this.password);
}

module.exports = User;