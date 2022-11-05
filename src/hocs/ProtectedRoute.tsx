import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: any
  isAuthenticated: boolean
}

export default function ProtectedRoute ({ children, isAuthenticated }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}
