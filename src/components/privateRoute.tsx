import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks.ts'
import { PropsWithChildren } from 'react'

function PrivateRoute({ children }: PropsWithChildren<object>) {
  const auth = useAppSelector((state) => state.user.isAuth)

  if (!auth) {
    return <Navigate to='/' />
  }

  return <>{children}</>
}

export default PrivateRoute
