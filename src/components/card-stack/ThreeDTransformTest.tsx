import React from 'react'
import DragCard from './DragCard'

export default function ThreeDTransformTest () {
  const style = {
    width: '400px',
    height: '400px',
    borderRadius: '8px',
    border: '1px solid black',
    backgroundColor: 'grey'
  }
  return (
    <div>
      <DragCard>
        <div style={style} />
      </DragCard>
      <DragCard>
        <div style={style} />
      </DragCard>
    </div>
  )
}
