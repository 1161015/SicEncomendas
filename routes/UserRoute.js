const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/UserController');

// a simple test url to check that all of our files are communicating correctly.
router.post('/authenticate', user_controller.authenticate_user);
router.get('/',user_controller.findAll);

module.exports = router;