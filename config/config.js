const { randomNumber } = require('../lib/utils')

const defaultCategoriesString = ['home', 'health', 'food', 'leisure', 'shop', 'restaurant', 'clothing', 'transport', 'gift', 'other']

const defaultCategories = () => defaultCategoriesString.map(item => ({
  categoryName: item,
  categoryColor: `#${randomNumber(255, 10).toString(16)}${randomNumber(255, 10).toString(16)}${randomNumber(255, 10).toString(16)}`,
  categoryIcon: '',
}))

const currenciesLocales = [
  {
    currency: 'USD',
    locale: 'en-US',
  },
  {
    currency: 'EUR',
    locale: 'fr-FR',
  },
  {
    currency: 'PLN',
    locale: 'pl-PL',
  },
  {
    currency: 'GBP',
    locale: 'en-UK',
  },
]

const supportedCurrencies = ['USD', 'EUR', 'PLN', 'GBP']

module.exports = {
  defaultCategories,
  currenciesLocales,
  supportedCurrencies,
}