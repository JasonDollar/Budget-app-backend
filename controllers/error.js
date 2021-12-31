module.exports = (err, req, res, next) => {

  if (err.name === 'ValidationError') {
    console.error('Error Validating!', err)
    res.status(422).json(err)
  } else {
    console.error(err)
    res.status(500).json(err)
  }
  next()
}