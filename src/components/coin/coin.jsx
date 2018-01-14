import React, { Component } from 'react';
import './Coin.css'
import { callCoinApi } from '../../utilities/api'
import { formatToMoney } from '../../utilities/coinHelper'

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

  async getValues () {
    if (this.props.coin === '') return
    const coinInfo = await callCoinApi(this.props.coin.coin_code)
    this.setValues(coinInfo)
  }

  setValues = response => {
    const coin_value = response.data.AUD
    const total_amount = this.props.coin.amount
    const bought_at = this.props.coin.bought_at

    const current_value = coin_value * total_amount
    const initial_value = bought_at * total_amount

    this.props.updateTotal(current_value)

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

    const loading = (
      <div className="spinner">
        <div className="dot1"></div>
        <div className="dot2"></div>
      </div>
    )

    const coinInformation = (
      <div className="Coin">
        <h2>{amount} x {coin_code}</h2>
          <p>
            Initial Cost: { formatToMoney(initial_value) }
            <br/>
            Current Value: { formatToMoney(current_value) }
          </p>
        <h3 className={textColor}>Profit: { formatToMoney(profit) }</h3>
      </div>
    )

    return ( !loaded ? loading : coinInformation );
  }
}

export default Coin;
