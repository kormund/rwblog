import { fetchData } from './userAPI.ts'

const changeFavorited = async (method: 'POST' | 'DELETE', slug: string, token: string) => {
  try {
    const response = await fetchData(
      `articles/${slug}/favorite`,
      {
        method,
      },
      token,
    )

    return response.data
  } catch (e: any) {
    throw new Error('cant favorite post')
  }
}

export const favoritePost = async (slug: string, token: string) => {
  return await changeFavorited('POST', slug, token)
}
export const unfavoritePost = async (slug: string, token: string) => {
  return await changeFavorited('DELETE', slug, token)
}
