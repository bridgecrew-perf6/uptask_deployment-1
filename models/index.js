const Project = require('./Project');
const Task = require('./Task');
const User = require('./User')
// Model - foreign key - parent primary id ( relationships restrictions )
Task.belongsTo(Project, { foreignKey: 'project_id', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'RESTRICT' });
// Model - childen foreign key - primary key
Project.hasMany(Task,  { foreignKey: 'project_id', sourceKey: 'id' });
Project.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
//
User.hasMany(Project, { foreignKey: 'user_id', sourceKey: 'id' });
