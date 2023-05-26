import styled, { css } from 'styled-components'
import { ReactElement } from 'react'

interface ButtonType {
  success?: boolean
  bordered?: boolean
  small?: boolean
  error?: boolean
  primary?: boolean
}

const StyledButton = styled.button<ButtonType>`
  font-size: 18px;
  line-height: 28px;
  color: ${({ theme }) => theme.heading};
  text-decoration: none;
  background: ${({ theme }) => theme.baseBg};
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: 5px;
  padding: 8px 18px;

  ${({ success }) =>
    success &&
    css`
      color: ${({ theme }) => theme.success};
      border: 1px solid ${({ theme }) => theme.success};

      &:hover {
        background: ${({ theme }) => theme.success};
        color: ${({ theme }) => theme.baseBg};
      }
    `}

  ${({ bordered }) =>
    bordered &&
    css`
      color: ${({ theme }) => theme.text};
      border: 1px solid ${({ theme }) => theme.text};

      &:hover {
        color: ${({ theme }) => theme.baseBg};
        background: ${({ theme }) => theme.text};
      }
    `}

  ${({ small }) =>
    small &&
    css`
      font-size: 14px;
      line-height: 22px;
      padding: 6px 10px;
    `}

  ${({ error }) =>
    error &&
    css`
      color: ${({ theme }) => theme.error};
      border-color: ${({ theme }) => theme.error};

      &:hover {
        background: ${({ theme }) => theme.error};
        color: ${({ theme }) => theme.baseBg};
      }
    `}

  ${({ primary }) =>
    primary &&
    css`
      color: ${({ theme }) => theme.baseBg};
      background: ${({ theme }) => theme.primary};

      &:hover {
        background: ${({ theme }) => theme.baseBg};
        border-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.primary};
      }
    `}
`

type Props = ButtonType & {
  children: ReactElement | string
  onClick?: any
  submit?: boolean
}

function Button({ children, submit, ...otherProps }: Props) {
  return (
    <StyledButton {...otherProps} type={submit ? 'submit' : 'button'}>
      {children}
    </StyledButton>
  )
}

export { Button }
