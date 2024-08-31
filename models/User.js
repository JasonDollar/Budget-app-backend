const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { supportedCurrencies } = require('../config/config')
const { isHexColor } = require('../lib/utils')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, add a name'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please, add an email'],
    trim: true,
    lowercase: true,
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
      'Please add a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please, provide a password'],
    minlength: [8, 'Password need to be at least 8 characters long'],
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    },
  },

  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
  categories: [{
    categoryName: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      lowercase: true,
      maxlength: [180, 'Please, use shorter category name'],
    },
    categoryColor: {
      type: String,
      trim: true,
      validate(value) {
        if (!isHexColor(value)) {
          throw new Error('Please, provide valid hex color for a category color')
        }
      },
    },
    categoryIcon: String,
  }],
  settings: {
    currency: {
      type: String,
      required: true,
      enum: supportedCurrencies,
      default: 'USD',
    },
    locale: {
      type: String,
      default: 'en-US',
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  // avatar: {
  //   type: Buffer,
  // },
}, {
  timestamps: true,
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.role

  return userObject
}


const User = mongoose.model('User', userSchema)

module.exports = User