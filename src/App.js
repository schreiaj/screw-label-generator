import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MachineScrew from './MachineScrew'

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {screws: [
      this.createScrew({displayType:'10-24', displayLength:'3/4in', headType:'DIN912', headHeight:4.83 , headDiameter:7.9 , pitch:1/0.9448818898, diameter:4.8260 , length:25.4*.75} ),
      this.createScrew({displayType:'10-32', displayLength:'3/4in', headType:'DIN912', headHeight:4.83 , headDiameter:7.9 , pitch:1/1.2598425197, diameter:4.8260 , length:25.4*.75} )
    ]};
  }

  createScrew({displayType, displayLength, headType, headHeight, headDiameter, pitch, diameter, length}) {
    return {displayType,
    displayLength,
    headType,
    headHeight,
    headDiameter,
    pitch,
    diameter,
    length};
  }

  cloneLastScrew = () => {
    let screws = this.state.screws;
    screws.push(screws[screws.length - 1]);
    this.setState({screws});
  }

  removeScrew = (index) => {
    return () => {
      console.log(index);
      let screws = this.state.screws;
      // You should check that the index isn't < 0 normally
      // since this function is only called from generated indices
      screws.splice(index, 1);
      this.setState({screws});
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.screws.map((s, i) => <MachineScrew key={i} {...s} />)}
        <div className='label add' onClick={this.cloneLastScrew}> </div>
      </div>
    );
  }
}

export default App;
