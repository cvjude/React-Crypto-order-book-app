import React, { Component } from 'react'
import './style.scss';

export default class DropDown extends Component {
  state = {
    presentValue: '',
    openDrop: false,
  }

  handleClick = (e, url_symbol, name) => {
    const { handleSubscription } = this.props;
    const value = e.target.innerHTML;
    this.setState({
      presentValue: value,
      openDrop: false
    })
    handleSubscription(url_symbol, name)
  }

  revileDropDown = () => {
    this.setState((prevState) => ({
      openDrop: !prevState.openDrop
    }))
  }

  render() {
    const { openDrop } = this.state;
    const { pairs } = this.props;
    if (pairs.length <= 0) return (<div>loading</div>);
    const presentValue = pairs[0].description;
    const pair = pairs.map(pair => (
      <button type="button" key={pair.name} value={pair.description}
        onClick={
          (e) => this.handleClick(e, pair.url_symbol, pair.name)
        }> {pair.description}</button >
    ));
    return (
      <div className="dropDown">
        <button className="currentValue" type="button" onClick={this.revileDropDown}>
          {presentValue}
        </button>
        {openDrop ?
          (<div className="dropDownButtons">
            {pair}
          </div>) : null
        }
      </div>
    )
  }
}
