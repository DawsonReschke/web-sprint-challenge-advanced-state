import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from "../state/action-creators"
function Wheel(props) {
  const cogArray = new Array(6)
  cogArray.fill(null)
  const {
    wheel,
    moveClockwise,
    moveCounterClockwise
  } = props
  return (
    <div id="wrapper">
      <div id="wheel">
        {cogArray.map((cog,index)=>{
          return index === wheel 
          ? (<div className="cog active" style={{ "--i": index }}>B</div>)
          : (<div className="cog" style={{ "--i": index }}></div>)
        })}
      </div>
      <div id="keypad">
        <button onClick={moveCounterClockwise} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={moveClockwise} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st=>st,actionCreators)(Wheel)