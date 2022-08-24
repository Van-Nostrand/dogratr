import React from 'react'
// import DragCard from './DragCard'
import DragAndRotateCard from './DragAndRotateCard'
import './card-stack.scss'

export default function CardStack () {
  return (
    <div className="card-stack">
      <div>CARD STACK</div>
      <DragAndRotateCard />
      {/* <DragCard /> */}
    </div>
  )
}
