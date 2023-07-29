// sprouter
const router = require('express').Router();
const AdminController = require('../controllers/AdminController');

router.get('/admin', AdminController.admin)

module.exports = router
