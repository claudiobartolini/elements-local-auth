'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const config = require('config');
const BoxConfig = config.get('BoxConfig');

const indexCtrl = require('../controllers/indexController');
const loginCtrl = require('../controllers/loginController');
const usersCtrl = require('../controllers/usersController');
const contentPickerCtrl = require('../controllers/contentPickerController');
const contentUploaderCtrl = require('../controllers/contentUploaderController');
const contentTreeCtrl = require('../controllers/contentTreeController');
const logoutCtrl = require('../controllers/logoutController');

router.get('/', indexCtrl.main);

router.get('/user/:id?', ensureLoggedIn, usersCtrl.main);
router.get('/content-picker/:id?', ensureLoggedIn, contentPickerCtrl.main);
router.get('/content-uploader/:id?', ensureLoggedIn, contentUploaderCtrl.main);
router.get('/content-tree/:id?', ensureLoggedIn, contentTreeCtrl.main);
router.get('/logout', ensureLoggedIn, logoutCtrl.main);


router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

router.get('/login', function(req, res){
  res.render('pages/login', { user: req.user });
});

// GET /auth/Box
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Box authentication will involve
//   redirecting the user to Box.com.  After authorization, Box
//   will redirect the user back to this application at /auth/box/callback
router.get('/auth/box',
  passport.authenticate('box'),
  function(req, res){
    // The request will be redirected to Box for authentication, so this
    // function will not be called.
  });

// GET /auth/box/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/box/callback', 
  passport.authenticate('box', { failureRedirect: 'pages/login' }),
  function(req, res) {
    res.redirect('/');
  });

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('pages/login')
}

module.exports = router;