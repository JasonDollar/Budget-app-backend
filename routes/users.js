const express = require('express')

const auth = require('../middleware/auth')

const { createUser, getLoggedUserInfo, addCategory } = require('../controllers/users')

const router = express.Router()

router.route('/')
  .post(createUser)

router.route('/userDetails')
  .get(auth, getLoggedUserInfo)

router.route('/category')
  .post(auth, addCategory)

module.exports = router