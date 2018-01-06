import React, { Component } from 'react';
import './Coin.css'
import axios from 'axios'

class Coin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: this.props.coin_code, 
      coin_value: 0,
      current_value: 0,
      initial_value: 0,
      profit: 0,
      loaded: false
    }
  }

  componentDidMount() {
    this.getValues()
  }

  getValues = () => {
    const { coin_code  } = this.props.coin
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${coin_code}&tsyms=AUD`
    axios.get(url)
    .then((response) => {
      this.setValues(response)  
      console.log('res', response)
    })
    .catch((error) => {
      console.log('er',error)
    })
  }

  setValues = response => {
    const coin_value = response.data.AUD
    const total_amount = this.props.coin.amount
    const bought_at = this.props.coin.bought_at

    const current_value = coin_value * total_amount
    const initial_value = bought_at * total_amount

    this.setState({
      coin_value,
      current_value,
      initial_value,
      profit: current_value - initial_value,
      loaded: true
    })
  }

  

  render() {
     

    const {
      current_value,
      initial_value,
      profit,
      loaded
    } = this.state

    const textColor = profit < 0 ? 'loss' : 'profit'

    const {
      amount,
      coin_code
    } = this.props.coin

    const loading = <div className="spinner">
      <div className="dot1"></div>
      <div className="dot2"></div>
    </div>

    const coinInformation = <div className="Coin">
      <h2>{amount} x {coin_code}</h2>
        <p>
          Initial Cost: AU$ {initial_value.toFixed(2)}
          <br/>
          Current Value: AU$ {current_value.toFixed(2)}
        </p>
      <h3 className={textColor}>Profit: AU$ {profit.toFixed(2)}</h3>
    </div>

    return ( !loaded ? loading : coinInformation );
  }
}

export default Coin;
