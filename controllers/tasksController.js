const Project = require('../models/Project');
const Task = require('../models/Task');

exports.add = async (req, res, next) => {
  // get project;
  const project = await Project.findOne({
    where: {
      url: req.params.url
    }
  });
  const { name } = req.body;
  const completed = 0;

  //const projectId = project.id;
  try {
    const task = await project.createTask({ name, completed });
    if(!task) return next();

    res.redirect(`/projects/${req.params.url}`);

  } catch (error) {
    console.log(error)
  }

}

exports.toggleStatus = async (req, res, next) => {

  const task = await Task.findOne({
    where: {
      id: req.params.id
    }
  });

  try {
    if(!task) return next();

    const response = task.update({ completed: !task.completed});

    if(!response) return next();

    res.status(200).send('OK')

  } catch (error) {
    console.log(error)
  }
}

exports.delete = async (req, res, next) => {

  const task = await Task.findOne({
    where: {
      id: req.params.id
    }
  });

  try {
    if(!task) return next();

    const response = task.destroy();

    if(!response) return next();

    res.status(200).send('Task deleted')

  } catch (error) {
    console.log(error)
  }
}