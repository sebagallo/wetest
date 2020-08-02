const express = require('express');

const router = express.Router();
const parkingsController = require('../controllers/parkings-controller');

/* Display List of Parkings. */
router.get('/', parkingsController.getParkingsList);

/* Display parking by ID. */
router.get('/:id', parkingsController.getParking);

module.exports = router;
