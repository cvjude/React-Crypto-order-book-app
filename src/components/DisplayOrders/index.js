import React, { Component } from 'react';
import axois from 'axios';
import { subscribe, unsubscribe } from '../../Utils';
import DropDown from '../DropDown';
import DataTable from '../DataTable';
import './style.scss';

export default class DisplayOrders extends Component {

  state = {
    pairs: [],
    currentSocket: {},
    currentPair: '',
    asks: [],
    bids: [],
    currentCurrenyName: ''
  }

  async componentDidMount() {
    try {
      const response = await axois.get('https://www.bitstamp.net/api/v2/trading-pairs-info/');
      this.setState({
        pairs: response.data,
        currentPair: response.data[0].url_symbol
      })

      const websocket = subscribe(response.data[0].url_symbol);
      websocket.onmessage = (data) => {
        const currencyData = JSON.parse(data.data);
        this.setState({
          currentSocket: websocket,
          asks: currencyData.data.asks,
          bids: currencyData.data.bids,
          currentCurrenyName: response.data[0].name,
        })
      }
    } catch (error) {
      // console.log(error);
    }
  }

  handleSubscription = (currency_pair, name) => {
    const { currentSocket, currentPair } = this.state;
    unsubscribe(currentSocket, currentPair)

    const websocket = subscribe(currency_pair);
    websocket.onmessage = (data) => {
      const currencyData = JSON.parse(data.data);
      this.setState({
        currentSocket: websocket,
        currentPair: currency_pair,
        asks: currencyData.data.asks,
        bids: currencyData.data.bids,
        currentCurrenyName: name,
      })
    }
  }

  render() {
    const { pairs, asks, bids, currentCurrenyName } = this.state;
    return (
      <div className="orders">
        <div className="top-section">
          <h2>
            Please Select your currency Pair
          </h2>
          <DropDown pairs={pairs} handleSubscription={this.handleSubscription} />
        </div>
        <div className="lowerSection">
          <DataTable description={currentCurrenyName} title="Asks" data={asks} />
          <DataTable description={currentCurrenyName} title="Bids" data={bids} />
        </div>
      </div>
    )
  }
}
