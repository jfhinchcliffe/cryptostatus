import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coin_code: '',
      amount: '',
      bought_at: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => this.setState({[event.target.id]: event.target.value})

  handleSubmit (event) {
    event.preventDefault()
    this.props.addCoin(this.state)
    this.clearState()
  }

  clearState() {
    this.setState({coin_code: '', amount: '', bought_at: ''})
  }

  render() {
    return (
      <div className="Form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Coin Code
            <input id="coin_code" type="text" value={this.state.coin_code} onChange={this.handleChange} />
          </label>
          <label>
            Amount
            <input id="amount" type="text" value={this.state.amount} onChange={this.handleChange} />
          </label>
          <label>
            Bought At
            <input id="bought_at" type="text" value={this.state.bought_at} onChange={this.handleChange} />
          </label>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default Form;
