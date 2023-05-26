import { useState } from 'react'
import { Article, FormValues } from '../components/article.tsx'
import { useAppSelector } from '../store/hooks'
import { selectToken } from '../store/slices/userSlice.ts'
import { createArticle } from '../api/articleAPI.ts'
import { Navigate } from 'react-router-dom'
import BlogBody from '../components/blogBody.tsx'

const CreateArticlePage = () => {
  const token = useAppSelector(selectToken)
  const [articleURL, setArticleURL] = useState<string>('')

  const onSubmit = async (data: FormValues) => {
    if (token) {
      const { articleTitle, tags, text, description } = data
      const transformedData = {
        title: articleTitle,
        tagList: tags.map((tag) => tag.name),
        body: text,
        description,
      }

      const response = await createArticle(transformedData, token)

      setArticleURL(response.article.slug)
    }
  }

  return (
    <BlogBody>
      {articleURL && <Navigate to={`/articles/${articleURL}`} />}
      <Article title={'Create new article'} submitHandler={onSubmit} />
    </BlogBody>
  )
}

export default CreateArticlePage
