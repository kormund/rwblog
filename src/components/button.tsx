import styled from 'styled-components'
import { ReactElement } from 'react'

const StyledButton = styled.button``

interface Props {
  children: ReactElement | string
  onClick?: never
}

function Button({ children, ...otherProps }: Props) {
  return <StyledButton {...otherProps}>{children}</StyledButton>
}

export { Button }
