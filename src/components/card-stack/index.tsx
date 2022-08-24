import React from 'react'
// import Card from './Card'
import DragAndRotateCard from './DragAndRotateCard'
import './card-stack.scss'

export default function CardStack () {
  return (
    <div className="card-stack">
      <div>CARD STACK</div>
      <DragAndRotateCard />
    </div>
  )
}
