import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import './Form.css'

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
          <TextField
            hintText='eg. BTC'
            floatingLabelText='coin code'
            id="coin_code"
            value={this.state.coin_code} 
            onChange={this.handleChange}
          />
          <br/>
          <TextField
            hintText='eg. 100'
            floatingLabelText='amount owned'
            id="amount"
            value={this.state.amount} 
            onChange={this.handleChange}
          />
          <br/>
          <TextField
            hintText='eg. 2000'
            floatingLabelText='original purchase price'
            id="bought_at"
            value={this.state.bought_at} 
            onChange={this.handleChange}
          />
          <br/>
          <RaisedButton label="Submit" type="submit" primary={true} />
        </form>
      </div>
    );
  }
}

export default Form;
