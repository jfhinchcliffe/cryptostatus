const constructCoin = (coin_code) => `https://min-api.cryptocompare.com/data/price?fsym=${coin_code}&tsyms=AUD`

const tallyCoinValue = (coins) => {
  console.log('coins', coins)
}

const formatToMoney = (number) => {
  return `AU$ ${number.toFixed(2)}`
}

export { tallyCoinValue, formatToMoney }