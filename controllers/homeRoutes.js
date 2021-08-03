const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    
    // Get all blog posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.post('/login', (req, res) => {
  try {
    // Look for a user in the DB using the passed name
    const userData = await User.findOne({
      where: { username: req.body.name}
    });
    // Validate password for the User if found
    userData.checkPassword(req.body.password) ? res.status(200) : res.status(400).json(err);
  } catch (err) {
    res.status(400).json(err);
  }
  // Save authenticated user info into the session

});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  try {

  } catch (err) {

  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    
    // Get all blog posts and JOIN with user data
    const postData = await Post.findAll({
      where: { user_id: '' },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;