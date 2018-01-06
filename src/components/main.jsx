import React, { Component } from 'react';
import './Main.css'

import Form from './form/form'
import Coin from './coin/coin'

import IconButton from 'material-ui/IconButton';
import ActionTurnedIn from 'material-ui/svg-icons/action/turned-in';
import ActionTurnedInNot from 'material-ui/svg-icons/action/turned-in-not';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coins: [],
      form_open: true,
      individual_link: false,
      total_value: 0
    }

    this.addCoin = this.addCoin.bind(this)
    this.toggleFormOpen = this.toggleFormOpen.bind(this)
  }

  componentDidMount() {
    this.setFromParams()
  }

  setFromParams() {
    let url_parts = window.location.href.split('?')
    if (url_parts.length < 2) return
    const root_url = url_parts.shift()
    const sections = url_parts.map(section => section.split('&'))
    sections.map(section => this.addCoinToState(section))
  }

  addCoinToState(coin_section) {
    let coin = {
      amount:coin_section[1],
      bought_at:coin_section[2],
      coin_code: coin_section[0]
    }
    this.setState(prevState => ({
      form_open: false,
      individual_link: true
    }))
    this.addCoin(coin)
  }

  addCoin(coin) {
    let new_coin = {
      coin_code: coin.coin_code,
      amount: coin.amount,
      bought_at: coin.bought_at
    }

    if (new_coin.coin_code === '' || new_coin.amount === undefined || new_coin.bought_at === undefined ) return

    this.setState(prevState => ({
      coins: [...prevState.coins, new_coin]
    }))
  }

  toggleFormOpen() {
    this.setState(prevState => ({
      form_open: !prevState.form_open
    }))
  }

  createLink() {
    const base_url = window.location.href
    const coin_params = this.state.coins.map(coin => `${coin.coin_code}&${coin.amount}&${coin.bought_at}?`)
    return base_url + '?' + coin_params.join('')
  }

  render() {
    const link = this.createLink()

    const styles = { width: 48, height: 48 }

    const form_controls = (
      <div className="controls">
        <div className="toggle">
          <IconButton iconStyle={ styles }> 
            { this.state.form_open ? <ActionTurnedIn onClick={this.toggleFormOpen}/> : <ActionTurnedInNot onClick={this.toggleFormOpen} /> } 
          </IconButton>
        </div>  
        <div className="link">
          <IconButton iconStyle={ styles } href={link}> 
            <ActionNoteAdd />
          </IconButton>
        </div>
      </div>
    )

    const coins = this.state.coins.map((coin, index) =>  <Coin key={`${index}-${coin.coin_code}`} coin={coin}/>)

    const form = this.state.form_open ? <Form addCoin={this.addCoin} /> : ''

    return (
      <div className="Main">
        <h2 className="header">CoinStatus</h2>
        { form }
        { form_controls }

        <div className="Coins">
          {coins}
        </div>
      </div>
    );
  }
}

export default Main;
