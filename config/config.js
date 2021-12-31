const defaultCategories = ['home', 'health', 'food', 'leisure', 'shop', 'restaurant', 'clothing', 'transport', 'gift', 'other']

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