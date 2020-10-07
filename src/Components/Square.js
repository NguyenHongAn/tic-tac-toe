import React from 'react';

import '../App.css';

class Square extends React.Component {

    constructor(props)
    {
      super(props);
      this.state = {
        value: null
      };
      this.HandleOnClick = this.props.click;
    }
  
  
    render() {
      return (
        <button className="square" onClick={() => this.HandleOnClick()}>
          {this.props.value}
        </button>
      );
    }
  }

export default Square;