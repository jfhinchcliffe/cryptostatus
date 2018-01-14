import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { callCoinList } from '../../utilities/api'

import './Form.css'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_value: 'Choose a coin...',
      dropdown_disabled: true,
      dropdown_values: [],
      coin_code: '',
      amount: '',
      bought_at: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.getDropdownValues()
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



  async getDropdownValues () {
    const coinInfo = await callCoinList()
    
    this.setDropdownValues(coinInfo)
  }

  setDropdownValues(coinInfo) {
    const formatted_values = Object.entries(coinInfo).map(val => ({value: val['1']['Symbol'], primaryText: val['1']['FullName'] }))
    this.setState({
      dropdown_values: formatted_values,
      dropdown_disabled: false
    })
  }


  render() {

    const styles = {
      customWidth: {
        width: 300,
      },
    };
  
    const menuItemValues = this.state.dropdown_values.map(ddv => (<MenuItem value={ddv.value} primaryText={ddv.primaryText} />))

    return (
      <div className="Form">
        <form onSubmit={this.handleSubmit}>
          <DropDownMenu maxHeight={300} id="selected_value" value={this.state.selected_value} onChange={this.handleChange} disabled={this.props.dropdown_disabled} style={styles.customWidth} autoWidth={false} >
            {menuItemValues}
          </DropDownMenu>
          
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
