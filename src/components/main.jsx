import React, { Component } from 'react';

import Form from './form/form'
import Coin from './coin/coin'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coins: []
    }

    this.addCoin = this.addCoin.bind(this)
  }

  addCoin(coin) {
    let new_coin = {
      coin_code: coin.coin_code,
      amount: coin.amount,
      bought_at: coin.bought_at
    }

    this.setState(prevState => ({
      coins: [...prevState.coins, new_coin]
    }))
  }

  render() {
    let coins = this.state.coins.map((coin) =>  <Coin key={coin.coin_code} coin={coin}/>)
    return (
      <div className="App">
        <p>Main.jsx</p>
        <Form addCoin={this.addCoin} />
        {coins}
      </div>
    );
  }
}

export default Main;
