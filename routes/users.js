const express = require('express')

const auth = require('../middleware/auth')

const {
  createUser, loginUser, logoutUser, getLoggedUserInfo, addCategory, 
} = require('../controllers/users')

const router = express.Router()

router.route('/')
  .post(createUser)

router.route('/login')
  .post(loginUser)

router.route('/logout')
  .post(auth, logoutUser)

router.route('/userDetails')
  .get(auth, getLoggedUserInfo)

router.route('/category')
  .post(auth, addCategory)

module.exports = router