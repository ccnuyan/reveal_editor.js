import React, { Component } from 'react';

class Previewer extends Component {
  render =() => {
    return (
      <div className="ui vertical animated button" tabIndex="0">
        <div className="hidden content">Edit</div>
        <div className="visible content">
          <i className="edit icon"></i>
        </div>
      </div>);
  }
}

export default Previewer;
