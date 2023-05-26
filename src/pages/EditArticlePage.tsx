import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from 'antd'
import { getArticle, updateArticle } from '../api/articleAPI.ts'
import { useAppSelector } from '../store/hooks'

import { Article, FormValues } from '../components/article.tsx'
import { selectToken } from '../store/slices/userSlice.ts'
import styled from 'styled-components'
import { PostType } from '../types/post.ts'
import BlogBody from '../components/blogBody.tsx'

const StyledEditArticlePage = styled.div<object>`
  width: 80%;
  margin: 0 auto;
  .success-message {
    width: 300px;
    position: fixed;
    right: 30px;
    bottom: 30px;
  }
`

const EditArticlePage = () => {
  const { id } = useParams()
  const [article, setArticle] = useState<PostType | undefined>(undefined)

  useEffect(() => {
    getArticle(id).then((res) => setArticle(res.article))
  }, [id])

  const token = useAppSelector(selectToken)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  const defaultValues = useMemo(() => {
    return {
      articleTitle: article?.title,
      description: article?.description,
      text: article?.body,
      tags: article?.tagList.map((tag) => ({ name: tag })),
    }
  }, [article])

  const navigate = useNavigate()
  const onSubmit = async (data: FormValues) => {
    if (id && token) {
      const { articleTitle, description, text, tags } = data

      await updateArticle(id, token, {
        title: articleTitle,
        body: text,
        tagList: tags.map((tag) => tag.name),
        description,
      })

      setShowSuccess(true)
      navigate(-1)
    }
  }

  return (
    <BlogBody>
      <StyledEditArticlePage>
        <Article
          title={'Create new article'}
          submitHandler={onSubmit}
          defaultValues={defaultValues}
        />
        {showSuccess && (
          <div className={'success-message'}>
            <Alert
              message='Success'
              description={'Data updated successful'}
              type='success'
              showIcon
            />
          </div>
        )}
      </StyledEditArticlePage>
    </BlogBody>
  )
}

export default EditArticlePage
