const express = require('express');
const router = express.Router();
const {getAllFlights,
  getSingleFlight,
  createNewFlight,
  updateFlight,
  deleteFlight}= require('../controllers/flightController');

router.get('/flights', getAllFlights);
router.get('/flights/:id', getSingleFlight);
router.post('/flights', createNewFlight);
router.put('/flights/:id', updateFlight);
router.delete('/flights/:id', deleteFlight);

module.exports = router;

