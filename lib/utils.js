const randomNumber = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min

const isHexColor = hex => /^#[0-9A-F]{6}$/i.test(hex)

module.exports = {
  randomNumber,
  isHexColor,
}