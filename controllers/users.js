const bcrypt = require('bcryptjs')
const User = require('../models/User')
const catchAsync = require('../config/catchAsync')

const { defaultCategories } = require('../config/config')

exports.createUser = catchAsync(async (req, res) => {
  const user = new User(req.body)

  defaultCategories.forEach(item => user.categories.push(item))

  await user.save()
  const token = await user.generateAuthToken()

  res.status(201).json({ success: true, userData: { user, token } })
})

exports.getLoggedUserInfo = catchAsync(async (req, res) => {
  res.status(200).json({ user: req.user })
})

exports.addCategory = catchAsync(async (req, res) => {
  const { newCategory } = req.body
  if (!newCategory) return res.status(200).json({ success: false, message: 'Add category' })
  const { user } = req

  user.categories.push(newCategory)

  // // below resets categories
  // user.categories = []
  // defaultCategories.forEach(item => user.categories.push(item))

  await user.save()

  res.status(200).json({ categories: user.categories })
})

exports.loginUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(401).json({ success: false, message: 'Unable to login!' })
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password)

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Unable to login!' })
  }

  const token = await user.generateAuthToken()

  res.status(200).json({ success: true, userData: { user, token } })
})

exports.logoutUser = catchAsync(async (req, res) => {
  req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
  await req.user.save()

  res.json({ success: true })
})