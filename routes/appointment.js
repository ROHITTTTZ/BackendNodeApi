const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/', appointmentController.bookAppointment);
router.get('/', appointmentController.getAppointments);
router.get('/all', appointmentController.getAllAppointments);

module.exports = router;