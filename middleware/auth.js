const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
  try {
    // if (!)
    // console.log(req.header('Authorization'))
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await (await User.findOne({ _id: decoded._id, 'tokens.token': token }))
    // console.log(token, user)
    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user
    
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}

module.exports = auth