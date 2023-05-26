import { Outlet } from 'react-router-dom'
import Header from './header.tsx'

function Layout() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default Layout
