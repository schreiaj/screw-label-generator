import React, {Component} from 'react';
import {RIEInput, RIENumber} from 'riek';

import './App.css';
import MetricScrew from './generators/metric_screw';

class MachineScrew extends Component {

  constructor(...args) {
    super(...args);
    let {diameter, pitch, length, headType, displayType, displayLength, headDiameter, headHeight} = this.props;
    this.state = {diameter, pitch, length, headType, displayType, displayLength, headDiameter, headHeight};
  }

  changeParams = (update) => {
    this.setState(update);
  }

  changeParamsNumber = (update) => {
    update[Object.keys(update)[0]] = parseFloat(update[Object.keys(update)[0]]);
    this.setState(update);
  }

  render() {
    let {diameter, pitch, length, headType, displayType, displayLength, headDiameter, headHeight} = this.state;
    const thread = MetricScrew.generateThread(pitch, diameter).join(" ");
    const end = MetricScrew.generateEnd(pitch, diameter).join(" ");
    const threads = Array.from(new Array(Math.ceil(length/pitch)), (x,i) => i);

    return (
      <div className='label'>
      <div className='display'>
        <span className='display-type'><RIEInput value={displayType} propName='displayType' change={this.changeParams}/></span>
        <br/>
        <span className='display-length'><RIEInput value={displayLength} propName='displayLength' change={this.changeParams}/></span>
        <div className='form'>
          <label>Length:<RIENumber value={length} propName='length' change={this.changeParamsNumber}/>mm</label>
          <br/>
          <label>Diameter:<RIENumber value={diameter} propName='diameter' change={this.changeParamsNumber}/>mm</label>
          <br/>
          <label>Pitch:<RIENumber value={pitch} propName='pitch' change={this.changeParamsNumber}/>mm</label>
          <br/>
          <label>Head Height:<RIENumber value={headHeight} propName='headHeight' change={this.changeParamsNumber}/>mm</label>
          <br/>
          <label>Head Diameter:<RIENumber value={headDiameter} propName='headDiameter' change={this.changeParamsNumber}/>mm</label>
          <br/>
        </div>
      </div>
      <svg className='screw' version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  width="200" height={`${length+headHeight*1.5}mm`} >
      <svg width="100mm" height={`${length+headHeight*1.5}mm`} viewBox={`0 0 100 ${length+headHeight*1.5}`}>
        <rect className='head' x={`${diameter - headDiameter/2}`} y='0' width={`${headDiameter}`} height={`${headHeight}`} />
        <g transform={`translate(${diameter}) rotate(90) translate(${headHeight})`}>

          {threads.map((i) =>
            <g transform={`translate(${pitch*i})`} key={i}><path d={thread}></path></g>
          )}
          <g transform={`translate(${pitch*threads.length})`} ><path d={end}></path></g>

        </g>
        </svg>
        </svg>
      </div>
    );
  }
}

export default MachineScrew;
