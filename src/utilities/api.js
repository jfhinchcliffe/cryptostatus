import axios from 'axios'

const cryptoUrl = (coin_code) => `https://min-api.cryptocompare.com/data/price?fsym=${coin_code}&tsyms=AUD`

const coinListURL = `https://min-api.cryptocompare.com/data/all/coinlist`

async function callCoinApi (coin_code) {
  const response = await axios.get(cryptoUrl(coin_code))
  return await response
}

async function callCoinList () {
  const response = await axios.get(coinListURL)
  return await response.data.Data
}

export { callCoinApi, callCoinList }