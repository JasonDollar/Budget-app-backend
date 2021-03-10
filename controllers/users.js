const User = require('../models/User')
const catchAsync = require('../config/catchAsync')

exports.createUser = catchAsync(async (req, res) => {
  const user = new User(req.body)

  await user.save()
  const token = await user.generateAuthToken()

  res.status(201).json({ success: true, userData: { user, token } })
})

exports.getLoggedUserInfo = catchAsync(async (req, res) => {
  res.status(200).json({ user: req.user })
})