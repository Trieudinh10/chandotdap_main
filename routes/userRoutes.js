const express = require('express');
const router = express.Router();
const {requireAuth, checkUser,checkAdmin} = require('../middleware/authMiddleware');
const { getHomepage,postDeleteuser,postRemoveuser,getUpdatePage,postUpdateuser} = require('../controllers/userController');

router.get('/user',requireAuth,checkAdmin, getHomepage);

router.get('/update/:id', getUpdatePage);
router.post('/update_user', postUpdateuser);

router.post('/delete_user/:id', postDeleteuser);
router.post('/delete_user/', postRemoveuser);


module.exports = router;
