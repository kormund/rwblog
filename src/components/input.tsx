import { useEffect, useState } from 'react'
import { Message } from 'react-hook-form'
import styled, { css } from 'styled-components'

type Props = {
  error?: Message
  name: string
  register: any
  label?: string
  placeholder?: string
  type?: 'textarea' | 'text' | 'password'
}

type InputStyles = {
  isError?: boolean
}

const StyledInput = styled.div<InputStyles>`
  margin-bottom: 12px;

  .input-label {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.text};

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  textarea {
    height: 170px;
    resize: vertical;
  }

  .input {
    font-family: inherit;
    background: ${({ theme }) => theme.baseBg};
    border: 1px solid ${({ theme }) => theme.normal};
    border-radius: 4px;
    color: ${({ theme }) => theme.text};

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    width: 100%;
    box-sizing: border-box;
    padding: 8px 12px;

    &::placeholder {
      color: ${({ theme }) => theme.normal};
    }

    ${({ isError }) =>
      isError &&
      css`
        border-color: ${({ theme }) => theme.error};
      `}
  }

  .input-error {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.error};
  }
`

StyledInput.defaultProps = {
  isError: false,
}

export const Input = (props: Props) => {
  const { error, name, register, label, placeholder, type } = props
  const [errorStr, setErrorStr] = useState<string>('')

  useEffect(() => {
    setErrorStr(error || '')
  }, [error])

  return (
    <StyledInput isError={!!error}>
      <label className={'input-label'}>
        {label && <span className={'input-label__content'}>{label}</span>}
        {type !== 'textarea' ? (
          <input
            className={'input'}
            placeholder={placeholder || label || null}
            {...register(name)}
          />
        ) : (
          <textarea
            className={'input textarea'}
            placeholder={placeholder || label || null}
            {...register(name)}
          ></textarea>
        )}
      </label>
      {<span className={'input-error'}>{errorStr}</span>}
    </StyledInput>
  )
}
