import React, { Component } from 'react';

class IconSelector extends Component {
  render =() => {
    return (
      <div className="ui flowing popup top left transition hidden">
        <div className="ui three column divided center aligned grid">
          <div className="column">
            <h4 className="ui header">Basic Plan</h4>
            <p><b>2</b> projects, $10 a month</p>
            <div className="ui button">Choose</div>
          </div>
          <div className="column">
            <h4 className="ui header">Business Plan</h4>
            <p><b>5</b> projects, $20 a month</p>
            <div className="ui button">Choose</div>
          </div>
          <div className="column">
            <h4 className="ui header">Premium Plan</h4>
            <p><b>8</b> projects, $25 a month</p>
            <div className="ui button">Choose</div>
          </div>
        </div>
      </div>
    );
  }
}

export default IconSelector;
