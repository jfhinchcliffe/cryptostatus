const tallyCoinValue = (coins) => {
  console.log('coins', coins)
}

const formatToMoney = (number) => {
  return `AU$ ${number.toFixed(2)}`
}

const coinsFromUrlParser = () => {
  let url_parts = window.location.href.split('?').filter(val => val)
  if (url_parts.length < 2) return []
  url_parts.shift()
  return url_parts.map(section => createCoin(section.split('&')))
}

const createCoin = (coin_parts) => {
  return {
    amount: coin_parts[1],
    bought_at: coin_parts[2],
    coin_code: coin_parts[0]
  }  
}

export { tallyCoinValue, formatToMoney, coinsFromUrlParser }