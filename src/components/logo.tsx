import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLogo = styled(Link)`
  margin-right: auto;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.baseBg};
  display: flex;
  align-items: center;

  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.text};
    outline-offset: 5px;
  }
`

function Logo() {
  return <StyledLogo to={'/'}>Realworld Blog</StyledLogo>
}

export default Logo
