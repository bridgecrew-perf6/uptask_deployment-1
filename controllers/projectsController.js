
const Project = require('../models/Project');
const User = require('../models/User');
//const Task = require('../models/Task');
exports.home = async (req, res) => {
  const user = await User.findByPk(res.locals.user.id)
  const projects = await user.getProjects();

  res.render('index', {
    pageName: `Proyectos`,
    projects,
  });
}

exports.projectForm = async (req, res) => {
  const user = await User.findByPk(res.locals.user.id)
  const projects = await user.getProjects();
  res.render('newProject', {
    pageName: `New Project`,
    projects,
  })
}

exports.newProject = async (req, res) => {
  // print request on console
  //console.log(req.body);

  // user validation
  const { name } = req.body;

  const errors = [];

  if(!name){
    errors.push({text: 'Add Project Name'})
  }

  if(errors.length > 0){
    const user = await User.findByPk(res.locals.user.id)
    const projects = await user.getProjects();
    res.render('newProject', {
      pageName: `New Project`,
      errors,
      projects,
    })
  } else {
    // create Project
    try {
      const user = await User.findByPk(res.locals.user.id)
      await user.createProject({ name });
      //console.log('Success');
      res.redirect('/');
    } catch (error) {
      console.log(error)
    }
  }

}

exports.updateProject = async (req, res) => {
  const { name } = req.body;

  const errors = [];

  if(!name){
    errors.push({text: 'Add Project Name'})
  }

  if(errors.length > 0){
    const user = await User.findByPk(res.locals.user.id)
    const projects = await user.getProjects();
    res.render('newProject', {
      pageName: `Edit Project`,
      errors,
      projects,
    })
  } else {
    // ipdate Project
    try {
      //const project = await Project.create({ name });
      await Project.update(
        { name: name },
        { where: { id: req.params.id } }
      );
      console.log('Success');
      res.redirect('/');
    } catch (error) {
      console.log(error)
    }
  }
}

exports.showByUrl = async (req, res, next) => {

  const project = await Project.findOne({
    where: {
      url: req.params.url
    }
  });

  if(!project) return next();

  const user = await User.findByPk(res.locals.user.id)
  const projects = await user.getProjects();
  const tasks = await project.getTasks({ include: { model: Project } });
  //console.log(tasks);

  res.render('tasks', {
    pageName: `Project Tasks`,
    project,
    projects,
    tasks,
  })

};

exports.show = async (req, res, next) => {

  const project = await Project.findOne({
    where: {
      id: req.params.id
    }
  });

  console.log(project);

  //if(!project) return next();

  const user = await User.findByPk(res.locals.user.id)
  const projects = await user.getProjects();

  // user validation
  const { name } = req.body;

  const errors = [];

  // if(!name){
  //   errors.push({text: 'Add Project Name'})
  // }

  res.render('newProject', {
    pageName: `Edit Project`,
    errors,
    project,
    projects,
  })
}

exports.delete = async (req, res, next) => {

  const { urlProject } = req.query
  const result = await Project.destroy({ where: { url: urlProject } });
  if(!result) return next();

  res.status(200).send('Project Deleted');
}

