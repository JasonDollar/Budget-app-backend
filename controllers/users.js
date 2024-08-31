const bcrypt = require('bcryptjs')
const User = require('../models/User')
const catchAsync = require('../config/catchAsync')

const { defaultCategories, currenciesLocales } = require('../config/config')

exports.createUser = catchAsync(async (req, res) => {
  const user = new User(req.body)

  defaultCategories().forEach(item => user.categories.push(item))

  await user.save()
  const token = await user.generateAuthToken()

  return res.status(201).json({ success: true, userData: { user, token } })
})

exports.getLoggedUserInfo = catchAsync(async (req, res) => res.status(200).json({ user: req.user }))

exports.addCategory = catchAsync(async (req, res) => {
  const { newCategory } = req.body
  if (!newCategory) return res.status(200).json({ success: false, message: 'Add category' })
  const { user } = req

  const categoryIndex = user.categories
    .findIndex(item => item.toLowerCase() === newCategory.toLowerCase())

  if (categoryIndex >= 0) { return res.status(404).json({ success: false, message: 'Category already exist' }) }
  user.categories.push(newCategory)

  // // below resets categories
  // user.categories = []
  // defaultCategories.forEach(item => user.categories.push(item))

  await user.save()

  return res.status(200).json({ categories: user.categories })
})

exports.updateCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params
  const { user } = req

  const updatedCategories = user.categories
    .map(item => {
      if (item._id.equals(categoryId)) {
        return {
          ...item.toObject(),
          ...req.body,
        }
      } 
      return item
    })

  user.categories = updatedCategories

  await user.save()

  return res.status(200).json({ categories: updatedCategories })
})

exports.removeCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params

  if (!categoryId) { 
    return res.status(404).json({ success: false, message: 'Provide category you want to remove' }) 
  }
  
  const { user } = req
  const filteredCategories = user.categories
    .filter(item => !item._id.equals(categoryId))

  user.categories = filteredCategories

  await user.save()

  return res.status(200).json({ categories: filteredCategories })
})

exports.loginUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(401).json({ success: false, message: 'Unable to login!' })
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password)

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Unable to login!M' })
  }

  const token = await user.generateAuthToken()

  return res.status(200).json({ success: true, userData: { user, token } })
})

exports.logoutUser = catchAsync(async (req, res) => {
  req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
  await req.user.save()

  return res.json({ success: true })
})

exports.changeCurrency = catchAsync(async (req, res) => {
  const { newCurrency } = req.body
  const currencyData = currenciesLocales.find(item => item.currency === newCurrency)

  if (!currencyData) { return res.status(404).json({ success: false, message: 'Currency unsupported' }) }

  const { user } = req

  if (user.settings.currency === currencyData.currency) {
    return res.status(200).json({ success: true, currency: currencyData, message: 'Nothing changed' })
  }

  user.settings = currencyData

  await user.save()

  return res.status(200).json({ success: true, currency: currencyData })
})