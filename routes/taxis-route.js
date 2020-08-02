const express = require('express');

const router = express.Router();

const taxisController = require('../controllers/taxis-controller');

/* Display List of Taxis. */
router.get('/', taxisController.getTaxisList);

router.get('/:id', taxisController.getTaxi);

router.post('/:id/position', taxisController.updateTaxiPosition);

router.post('/:id/bonus', taxisController.giveBonusToTaxi);

module.exports = router;
