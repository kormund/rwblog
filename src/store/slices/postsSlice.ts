import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostsResponse, PostType } from '../../types/post.ts'
import { RootState } from '../store.ts'

const baseUrl = 'https://blog.kata.academy/api/'

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async (_, { getState }) => {
  const currentState = getState() as RootState
  const token = currentState.user.token
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }
  const response = await fetch(
    `${baseUrl}articles?limit=${5}&offset=${(currentState.posts.currentPage - 1) * 5}`,
    requestOptions,
  )
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
  currentPage: 1,
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
      state.posts = payload.articles
      state.totalPosts = payload.articlesCount
    })
  },
})

export const { setCurrentPage } = postsSlice.actions

export default postsSlice.reducer
