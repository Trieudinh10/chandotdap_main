const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {requireAuth, checkUser} = require('../middleware/authMiddleware');


router.get('*', checkUser);
router.get('/', (req, res) => res.render('home'));
router.get('/table_1', requireAuth, (req, res) => res.render('table_1'));
router.get('/chart', requireAuth, (req, res) => res.render('chart'));
router.get('/setting', requireAuth, (req, res) => res.render('setting'));
router.get('/table_2', requireAuth, (req, res) => res.render('table_2'));
router.get('/data', requireAuth, (req, res) => res.render('data'));


module.exports = router;

