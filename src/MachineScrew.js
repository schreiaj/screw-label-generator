import React from 'react';
import './App.css';
import MetricScrew from './generators/metric_screw';

export default ({diameter, pitch, length, headType, displayType, displayLength, headDiameter, headHeight}) => {

  const thread = MetricScrew.generateThread(pitch, diameter).join(" ");
  const end = MetricScrew.generateEnd(pitch, diameter).join(" ");
  const threads = Array.from(new Array(Math.ceil(length/pitch)), (x,i) => i);

  return (
    <div className='label'>
    <div className='display'>
      <span className='display-type'>{displayType}</span>
      <br/>
      <span className='display-length'>{displayLength}</span>

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
