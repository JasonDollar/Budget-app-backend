const express = require('express')

const auth = require('../middleware/auth')

const { createUser, getLoggedUserInfo } = require('../controllers/users')

const router = express.Router()

router.route('/')
  .post(createUser)

router.route('/userDetails')
  .get(auth, getLoggedUserInfo)

module.exports = router