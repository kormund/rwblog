import { PostResponse } from '../types/post.ts'
import { fetchData } from './userAPI.ts'

export type CreateArticleData = {
  title: string
  description: string
  body: string
  tagList: string[]
}

export type GetArticle = (slug: string | undefined, token?: string) => Promise<PostResponse>

export type CreateArticle = (data: CreateArticleData, token: string) => Promise<PostResponse>

export type DeleteArticle = (slug: string, token: unknown) => Promise<any>

export type UpdateArticle = (
  slug: string,
  token: string,
  article: CreateArticleData,
) => Promise<PostResponse>

export const getArticle: GetArticle = async (slug, token) => {
  const response = await fetchData(`articles/${slug}`, { method: 'GET' }, token)

  return response.data
}

export const createArticle: CreateArticle = async (data, token) => {
  const response = await fetchData(
    'articles/',
    {
      method: 'POST',
      data: {
        article: data,
      },
    },
    token,
  )

  return response.data
}

export const deleteArticle: DeleteArticle = async (slug, token) => {
  return await fetchData(
    `articles/${slug}`,
    {
      method: 'DELETE',
    },
    token,
  )
}

export const updateArticle: UpdateArticle = async (slug, token, data) => {
  const response = await fetchData(
    `articles/${slug}`,
    {
      method: 'PUT',
      data: { article: data },
    },
    token,
  )

  return response.data
}
