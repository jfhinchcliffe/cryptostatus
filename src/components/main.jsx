import React, { Component } from 'react';
import './Main.css'

import Form from './form/form'
import Coin from './coin/coin'

import IconButton from 'material-ui/IconButton';
import ActionTurnedIn from 'material-ui/svg-icons/action/turned-in';
import ActionTurnedInNot from 'material-ui/svg-icons/action/turned-in-not';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coins: [],
      form_open: true
    }

    this.addCoin = this.addCoin.bind(this)
    this.toggleFormOpen = this.toggleFormOpen.bind(this)
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

  toggleFormOpen() {
    this.setState(prevState => ({
      form_open: !prevState.form_open
    }))
  }



  render() {

    const styles = { width: 48, height: 48 }

    const form_toggle = (
      <div className="toggle">
        <IconButton iconStyle={ styles }> 
          { this.state.form_open ? <ActionTurnedIn onClick={this.toggleFormOpen}/> : <ActionTurnedInNot onClick={this.toggleFormOpen} /> } 
        </IconButton>
      </div>  
    )

    const coins = this.state.coins.map((coin, index) =>  <Coin key={`${index}-${coin.coin_code}`} coin={coin}/>)

    const form = this.state.form_open ? <Form addCoin={this.addCoin} /> : ''

    return (
      <div className="Main">
        <h2 className="header">CoinStatus</h2>
        { form }
        { form_toggle }
        <div className="Coins">
          {coins}
        </div>
      </div>
    );
  }
}

export default Main;
