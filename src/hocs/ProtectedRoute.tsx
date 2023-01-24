import React from 'react'
import { Navigate } from 'react-router-dom'
import { useShallowEqualSelector } from '@/hooks'
import { IRootStore } from '@/store/types'
// import { useDispatch } from 'react-redux'


interface ProtectedRouteProps {
  children: any
}

// function Wrapper ({ children, notVerifiedYet }: { children: any, notVerifiedYet: boolean}) {
//   const childrenWithProps = children.map((child: any) => {
//     // Checking isValidElement is the safe way and avoids a
//     // typescript error too.
//     if (isValidElement(child)) {
//       return cloneElement(child, { notVerifiedYet })
//     }
//     return children
//   })

//   return childrenWithProps()
// }

export default function ProtectedRoute ({ children }: ProtectedRouteProps) {
  const {
    verifiedLogin,
    checkingToken
  } = useShallowEqualSelector((state: IRootStore) => ({
    verifiedLogin: state.auth.verifiedLogin,
    checkingToken: state.auth.checkingToken
  }))

  if (!checkingToken && !verifiedLogin) {
    return (
      <Navigate to="/login" replace />
    )
  }
  return children
}
