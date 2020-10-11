import React from 'react';

import '../App.css';

class Square extends React.Component {

    constructor(props)
    {
      super(props);
      this.state = {
        value: null,
        class: this.props.class,
      };
      this.HandleOnClick = this.props.click;
    }
  
    componentDidUpdate(preProps)
    {
      const strClassName = this.props.class;
      if(strClassName !== preProps.class)
      {
        this.setState({
          class: strClassName,
        })
      }
    }
  
    render() {
      const strClassName = this.state.class ? this.state.class + " square": "square";
      return (
        <button className={strClassName} onClick={this.HandleOnClick}>
          {this.props.value}
        </button>
      );
    }
  }

export default Square;