// import express-validator
const { body } = require('express-validator');

const projectsController = require('../controllers/projectsController');
const tasksController = require('../controllers/tasksController');
const userLoggedIn = require('../middleware/userLoggedIn');
const authController = require('../controllers/authController');

module.exports = (router) =>{
  router.get('/',
    userLoggedIn,
    projectsController.home
  );
  router.get('/new-project',
    userLoggedIn,
    projectsController.projectForm
  );
  router.post('/new-project',
    userLoggedIn,
    body('name').not().isEmpty().trim().escape(),
    projectsController.newProject
  );
  //show project
  router.get('/projects/:url',
    userLoggedIn,
    projectsController.showByUrl
  );
  // form update project
  router.get('/project/edit/:id',
    userLoggedIn,
    projectsController.show
  );
  router.post('/new-project/:id',
    userLoggedIn,
    body('name').not().isEmpty().trim().escape(),
    projectsController.updateProject
  );
  // delete project
  router.delete('/projects/:url',
    userLoggedIn,
    projectsController.delete
  )

  // Tasks Routes
  // add a tasks
  router.post('/projects/:url',
    userLoggedIn,
    tasksController.add
  )
  // toggle completed task status
  router.patch('/tasks/:id',
    userLoggedIn,
    tasksController.toggleStatus
  )
  // delete a task
  router.delete('/tasks/:id',
    userLoggedIn,
    tasksController.delete
  )

  router.get('/logout', authController.logout)

  return router;
}