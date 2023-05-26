import { Control, useFieldArray } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { Input } from './input.tsx'
import { Button } from './button.tsx'
import { ArticleStyles, FormValues } from './article.tsx'

type Props = {
  control: Control<FormValues>
  register: any
  errors: any
  tagError: string
}

const StyledArticleFormTags = styled.div<ArticleStyles>`
  .tag-container {
    position: relative;
  }

  .tag-wrapper {
    display: grid;
    grid-template-columns: 300px 120px;
    align-items: start;
    gap: 18px;
  }

  .label {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;

    color: ${({ theme }) => theme.text};
  }

  .tags {
    margin-top: 10px;
  }

  .add-btn-wrapper {
    ${({ hasTags }) =>
      hasTags &&
      css`
        position: absolute;
        bottom: 18px;
        left: 450px;
      `}
  }

  .error {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.error};
  }
`

export const ArticleFormTags = (props: Props) => {
  const { control, register, errors, tagError } = props
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })

  const tags = fields.map((field, i) => {
    return (
      <div className={'tag-wrapper'} key={field.id}>
        <Input
          placeholder={'Tag'}
          register={register}
          name={`tags.${i}.name`}
          error={errors?.tags?.[i]?.name?.message as string}
        />
        <Button small error onClick={() => remove(i)}>
          Delete
        </Button>
      </div>
    )
  })

  const addTag = (e: Event) => {
    e.preventDefault()

    append({
      name: '',
    })
  }

  return (
    <StyledArticleFormTags hasTags={!!fields.length}>
      <div className='tag-container'>
        <label className={'label'}>Tags</label>
        <div className={'tags'}>{tags}</div>
        <div className={'add-btn-wrapper'}>
          <Button onClick={addTag} primary small>
            Add Tag
          </Button>
        </div>
      </div>
      {tagError && <span className='error'>{tagError}</span>}
    </StyledArticleFormTags>
  )
}
