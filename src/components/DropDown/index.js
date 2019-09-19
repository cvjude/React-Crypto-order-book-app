import React, { Component } from 'react'
import './style.scss';

export default class DropDown extends Component {
  state = {
    presentValue: '',
    openDrop: false,
  }

  handleClick = (e, url_symbol, name) => {
    const { handleSubscription } = this.props;
    console.log(e, e.target.innerHTML)
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
    const { openDrop, presentValue } = this.state;
    const { pairs } = this.props;
    if (pairs.length <= 0) return (<div>loading</div>);
    const pair = pairs.map(pair => (
      <button type="button" key={pair.name} value={pair.description}
        onClick={
          (e) => this.handleClick(e, pair.url_symbol, pair.name)
        }> {pair.description}</button >
    ));
    return (
      <div className="dropDown">
        <button className="currentValue" type="button" onClick={this.revileDropDown}>
          {presentValue ? presentValue : pairs[0].description}
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
