import React, { useEffect, useState, useRef } from 'react'
import './loading.scss'

export default function Loading ({ maxCount = 4, intervalTime = 400 }) {
  const [count, setCount] = useState(0)
  const _count = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (_count.current === maxCount) {
        setCount(0)
        _count.current = 0
      } else {
        setCount(_count.current + 1)
        _count.current += 1
      }
    }, intervalTime)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loading">
      <div className="loading-content">
        Loading{Array(count).fill('.').join('')}
      </div>
    </div>
  )
}
