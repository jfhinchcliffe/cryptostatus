import axios from 'axios'

const cryptoUrl = (coin_code) => `https://min-api.cryptocompare.com/data/price?fsym=${coin_code}&tsyms=AUD`

async function callCoinApi (coin_code) {
  const response = await axios.get(cryptoUrl(coin_code))
  return await response
}

export { callCoinApi }