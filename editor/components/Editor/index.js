import React, { Component } from 'react';

import Manipulations from './Manipulations';
import Elements from './Elements';


class Editor extends Component {
  render =() => {
    return (
      <div id='editor_panel' className="ui horizontal segments">
        <Manipulations></Manipulations>
        <Elements></Elements>
      </div>
    );
  }
}

export default Editor;
