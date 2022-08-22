import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '@/features/counter/counterSlice'

export default function ReduxTest () {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <button
        onClick={() => dispatch(increment())}
      >increment</button>
      <button
        onClick={() => dispatch(decrement())}
      >decrement</button>

      <div>the count is {count}</div>
    </div>
  )
}
