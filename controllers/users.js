const User = require('../models/User')
const catchAsync = require('../config/catchAsync')

exports.createUser = catchAsync(async (req, res) => {
  const user = new User(req.body)

  await user.save()
  const token = await user.generateAuthToken()

  res.json({ success: true, data: { user, token } })
})