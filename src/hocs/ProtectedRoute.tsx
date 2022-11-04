import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: any
  isAuthenticated: boolean
}

export default function ProtectedRoute ({
  children,
  isAuthenticated
}: ProtectedRouteProps) {
  // async function authUser (credentials: any, route: string) {
  //   return fetch(`http://localhost:8081/api/${route}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(credentials)
  //   })
  //     .then(data => data.text())
  //     .then(d => {
  //       console.log('response is', d)
  //       return d
  //     })
  // }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}
