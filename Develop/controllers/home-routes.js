const router = require('express').Router();
const { Project, User } = require('../models');

// GET all projects for homepage
router.get('/', async (req, res) => {
  try {
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const projects = projectData.map((project) =>
      project.get({ plain: true })
    );

    res.render('homepage', {
      projects,
      //loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;