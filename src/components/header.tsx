import styled from 'styled-components'
import Logo from './logo.tsx'
import { Button } from './button.tsx'
import Profile from './profile.tsx'

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.background};
`

const isAuth = false

function Header() {
  return (
    <StyledHeader>
      <Logo />
      {isAuth ? (
        <>
          <Button>Sign In</Button>
          <Button>Sign Up</Button>
        </>
      ) : (
        <>
          <Button>Create Article</Button>
          <Profile />
          <Button>Log Out</Button>
        </>
      )}
    </StyledHeader>
  )
}

export default Header
