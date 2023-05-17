import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostsResponse, PostType } from '../../types/post.ts'

const baseUrl = 'https://blog.kata.academy/api/'

type SearchParamType = {
  limit: number
  offset: number
}

const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async (data: SearchParamType) => {
  const { limit, offset } = data
  const response = await fetch(`${baseUrl}articles?limit=${limit}&offset=${offset}`)
  return (await response.json()) as PostsResponse
})

interface PostState {
  posts: PostType[]
  totalPosts: number
  currentPage: number
}

const initialState = {
  posts: [],
  totalPosts: 0,
  currentPage: 0,
} as PostState

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
      state.posts.push(...payload.articles)
      state.totalPosts = payload.articlesCount
    })
  },
})

export const { setCurrentPage } = postsSlice.actions

export default postsSlice.reducer
