import styled from 'styled-components'

type CheckboxStyles = {
  isError: boolean
}

const StyledCheckbox = styled.div<CheckboxStyles>`
  .label {
    display: flex;
    align-items: flex-start;
    gap: 8px;

    span {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: ${({ theme }) => theme.text};
    }

    input {
      margin-top: 5px;
    }
  }

  .error {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.error};
  }
`

type Props = {
  label?: string
  error?: string
  register: any
  name: string
}
export const Checkbox = (props: Props) => {
  const { label, register, name, error } = props

  return (
    <StyledCheckbox isError={!!error}>
      <label className={'label'}>
        <input type='checkbox' {...register(name)} />
        {label ? <span>{label}</span> : null}
      </label>
      <span className={'error'}>{error}</span>
    </StyledCheckbox>
  )
}
