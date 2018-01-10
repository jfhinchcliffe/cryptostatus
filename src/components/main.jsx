import React, { Component } from 'react';
import './Main.css'

import { formatToMoney, coinsFromUrlParser } from '../utilities/coinHelper'


import Form from './form/form'
import Coin from './coin/coin'

import IconButton from 'material-ui/IconButton';
import UpArrowIcon from 'material-ui/svg-icons/navigation/expand-less';
import DownArrowIcon from 'material-ui/svg-icons/navigation/expand-more';
import LinkIcon from 'material-ui/svg-icons/content/link';

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
    this.updateTotal = this.updateTotal.bind(this)
  }

  componentDidMount() {
    this.setFromParams()
  }

  updateTotal(value) {
    this.setState(prevState => ({
      total_value: prevState.total_value + value
    }))
  }

  setFromParams() {
    coinsFromUrlParser().map(coin => this.addCoinToState(coin))//this.addCoinToState(coin))
  }

  addCoinToState(coin) {
    this.setState(prevState => ({
      form_open: false,
      individual_link: true
    }))
    this.addCoin(coin)
  }

  addCoin(coin) {
    this.setState(prevState => ({
      coins: [...prevState.coins, coin]
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
    const {
      form_open,
      coins,
      total_value
    } = this.state

    const link = this.createLink()

    const styles = { width: 48, height: 48 }

    const form_controls = (
      <div className="controls">
        <div className="toggle">
          <IconButton iconStyle={ styles }> 
            { form_open ? <UpArrowIcon onClick={this.toggleFormOpen}/> : <DownArrowIcon onClick={this.toggleFormOpen} /> } 
          </IconButton>
        </div>  
        <div className="link">
          <IconButton iconStyle={ styles } href={link}> 
            <LinkIcon />
          </IconButton>
        </div>
      </div>
    )

    const coin_sections = coins.map((coin, index) =>  <Coin key={`${index}-${coin.coin_code}`} coin={coin} updateTotal={this.updateTotal}/>)

    const form = form_open ? <Form addCoin={this.addCoin} /> : ''

    return (
      <div className="Main">
        <h2 className="header">CoinStatus</h2> 
        <h3 className="total-value">Total Value: {formatToMoney(total_value)}</h3>
        { form }
        { form_controls }
        <div className="Coins">
          {coin_sections}
        </div>
      </div>
    );
  }
}

export default Main;
