const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { supportedCurrencies } = require('../config/config')

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
    type: String,
    trim: true,
    lowercase: true,
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

  return userObject
}


const User = mongoose.model('User', userSchema)

module.exports = User