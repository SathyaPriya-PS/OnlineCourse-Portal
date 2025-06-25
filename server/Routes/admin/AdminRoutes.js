const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../../Controllers/admin/AdminController');

router.post('/login', loginAdmin);

module.exports = router;
