import { Outlet } from 'react-router-dom'
import Header from './header.tsx'

function Layout() {
  return (
    <>
      <Header />
      <Outlet></Outlet>
    </>
  )
}

export default Layout
