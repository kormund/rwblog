import { ReactNode, useEffect } from 'react'
import { DeepPartial, FieldValues, useForm, ValidationMode } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ObjectSchema, Maybe, AnyObject } from 'yup'
import styled from 'styled-components'
import { Checkbox } from './checkbox.tsx'
import { Input } from './input.tsx'

export type FieldType = {
  label: string
  name: string
  value?: string
}

type Props<T extends Maybe<AnyObject>> = {
  submitHandler: (formData: T) => void
  title: string
  buttonText: string
  validationSchema: ObjectSchema<T>
  fieldsData: FieldType[]
  needDataAgree?: boolean
  helpText?: ReactNode
  errors?: {
    [key: string]: any
  }
  defaultValues?: DeepPartial<T>
  mode?: keyof ValidationMode
}

export type LoginFormStyles = object

const StyledLoginForm = styled.div<LoginFormStyles>`
  background: ${({ theme }) => theme.baseBg};
  border: 1px solid ${({ theme }) => theme.normal};
  box-shadow: 0 22px 106px rgba(0, 0, 0, 0.07), 0 9.19107px 44.2843px rgba(0, 0, 0, 0.0503198),
    0 4.91399px 23.6765px rgba(0, 0, 0, 0.0417275), 0 2.75474px 13.2728px rgba(0, 0, 0, 0.035),
    0 1.46302px 7.04911px rgba(0, 0, 0, 0.0282725), 0 0.608796px 2.93329px rgba(0, 0, 0, 0.0196802);
  border-radius: 6px;

  width: 384px;
  margin: 20px auto;
  box-sizing: border-box;
  padding: 36px 32px;

  .form-title {
    margin: 0 0 21px;
    background: ${({ theme }) => theme.baseBg};
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    color: ${({ theme }) => theme.text};
  }

  .form-submit {
    width: 100%;
    box-sizing: border-box;
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
    padding: 8px 12px;

    border: 1px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.baseBg};

    cursor: pointer;
    margin-top: 10px;

    &:hover {
      background: ${({ theme }) => theme.baseBg};
      color: ${({ theme }) => theme.primary};
    }
  }

  .help-text {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    margin: 8px 0 0;

    color: ${({ theme }) => theme.lightText};

    a {
      color: ${({ theme }) => theme.primary};
    }
  }
`

export const Form = <T extends FieldValues>(props: Props<T>) => {
  const {
    submitHandler,
    title,
    buttonText,
    validationSchema,
    fieldsData,
    needDataAgree,
    helpText,
    errors: propErrors,
    defaultValues,
    mode,
  } = props

  // @ts-ignore fix it later
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<T>({
    mode: mode || 'onChange',
    resolver: yupResolver<yup.AnyObjectSchema>(validationSchema),
    defaultValues: defaultValues,
  })

  useEffect(() => {
    if (propErrors) {
      const errorNames = Object.keys(propErrors)

      errorNames.forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setError(key, { type: 'custom', message: propErrors[key] })
      })
    }
  }, [propErrors])

  return (
    <StyledLoginForm>
      <h2 className='form-title'>{title}</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        {fieldsData.map(({ name, label }, i) => {
          const error = (errors[name]?.message || '') as string

          return (
            <Input
              key={`${name}_${i}`}
              name={name}
              register={register}
              label={label}
              error={error}
            />
          )
        })}
        {needDataAgree && (
          <Checkbox
            label={'I agree to the processing of my personal information'}
            register={register}
            error={(errors.personal?.message || null) as string}
            name={'personal'}
          />
        )}
        <button type={'submit'} className={'form-submit'}>
          {buttonText}
        </button>
      </form>
      <p className='help-text'>{helpText ? helpText : null}</p>
    </StyledLoginForm>
  )
}
