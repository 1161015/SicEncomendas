const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/ItemController');


// a simple test url to check that all of our files are communicating correctly.
router.post('/', item_controller.item_post);
router.get('/',item_controller.findAll);
router.get('/:id', item_controller.item_get);
router.delete('/:id', item_controller.item_delete);
router.put('/:id', item_controller.item_put);

module.exports = router;