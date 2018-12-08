const express = require('express');
const router = express.Router();

const encomenda_controller = require('../controllers/EncomendaController');


// a simple test url to check that all of our files are communicating correctly.
router.post('/', encomenda_controller.encomenda_post);
router.get('/',encomenda_controller.findAll);
router.get('/:id', encomenda_controller.encomenda_get);
router.delete('/:id', encomenda_controller.encomenda_delete);
router.put('/:id', encomenda_controller.encomenda_put);
router.get('/:id/itens',encomenda_controller.get_itens);
router.get('/:id1/item/:id2',encomenda_controller.get_item);

module.exports = router;