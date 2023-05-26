import styled from 'styled-components'
import Logo from './logo.tsx'
import { Button } from './button.tsx'
import Profile from './profile.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks.ts'
import { logoutUser } from '../store/slices/userSlice.ts'

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.baseBg};
  display: flex;
  justify-content: flex-end;
  padding: 0 22px;
  align-items: center;

  .logged-in {
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 27px;
  }
  .profile {
    text-decoration: none;
  }
`

function Header() {
  const { isAuth, username, image } = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <StyledHeader>
      <Logo />
      {!isAuth ? (
        <>
          <Link to={'/sign-in'}>
            <Button>Sign In</Button>
          </Link>
          <Link to={'/sign-up'}>
            <Button success>Sign Up</Button>
          </Link>
        </>
      ) : (
        <div className='logged-in'>
          <Button small success onClick={() => navigate('/new-article')}>
            Create Article
          </Button>
          <Link to={'/profile'} className='profile'>
            <Profile username={username} image={image} />
          </Link>
          <Button bordered onClick={onLogout}>
            Log Out
          </Button>
        </div>
      )}
    </StyledHeader>
  )
}

export default Header
