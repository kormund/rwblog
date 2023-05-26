import { useEffect } from 'react'
import { DeepPartial, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from './input.tsx'
import { ArticleFormTags } from './articleTags.tsx'
import styled from 'styled-components'

type Props = {
  title: string
  submitHandler: (data: FormValues) => void
  errors?: {
    [key: string]: string
  }
  defaultValues?: DeepPartial<FormValues>
}

export type ArticleStyles = {
  hasTags?: boolean
}

export const validationSchema = yup.object().shape({
  articleTitle: yup.string().required('Title is required').max(300, 'Title is too long'),
  description: yup.string().required('Description is required'),
  text: yup.string().required('Text is required'),
  tags: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('Tag is required'),
      }),
    )
    .required()
    .min(1, 'Tag list must have at least 1 items'),
})

export type FormValues = yup.InferType<typeof validationSchema>

const StyledArticle = styled.div<ArticleStyles>`
  background: ${({ theme }) => theme.baseBg};
  border: 1px solid ${({ theme }) => theme.normal};
  box-shadow: 0 22px 106px rgba(0, 0, 0, 0.07), 0 9.19107px 44.2843px rgba(0, 0, 0, 0.0503198),
    0 4.91399px 23.6765px rgba(0, 0, 0, 0.0417275), 0 2.75474px 13.2728px rgba(0, 0, 0, 0.035),
    0 1.46302px 7.04911px rgba(0, 0, 0, 0.0282725), 0 0.608796px 2.93329px rgba(0, 0, 0, 0.0196802);
  border-radius: 6px;
  padding: 48px 32px;
  width: 80%;
  box-sizing: border-box;
  margin-top: 20px;

  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    color: ${({ theme }) => theme.text};

    margin: 0;
  }

  .form-submit {
    width: 320px;
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
`

export const Article = (props: Props) => {
  const { title, submitHandler, errors: propErrors, defaultValues } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  useEffect(() => {
    if (propErrors) {
      const errorNames = Object.keys(propErrors)

      errorNames.forEach((key) => {
        // @ts-ignore "can't get right key type Path not working"
        setError(key, { type: 'custom', message: propErrors[key] })
      })
    }
  }, [propErrors])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  return (
    <StyledArticle>
      <h2 className={'title'}>{title}</h2>

      <form onSubmit={handleSubmit(submitHandler)}>
        <Input
          name={'articleTitle'}
          register={register}
          label={'Title'}
          error={errors.articleTitle?.message as string}
        />
        <Input
          name={'description'}
          register={register}
          label={'Short description'}
          error={errors.description?.message as string}
        />
        <Input
          name={'text'}
          register={register}
          label={'Text'}
          type={'textarea'}
          error={errors.text?.message as string}
        />

        <ArticleFormTags
          control={control}
          register={register}
          errors={errors}
          tagError={errors?.tags?.message as string}
        />

        <button type={'submit'} className={'form-submit'}>
          Send
        </button>
      </form>
    </StyledArticle>
  )
}
