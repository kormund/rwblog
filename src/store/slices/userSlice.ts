import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/user.ts'
import { RootState } from '../store.ts'

const initialState: User = {
  isAuth: false,
  username: '',
  email: '',
  token: '',
  image: 'https://rg.ru/uploads/images/161/31/13/kinopoisk.ru-Shrek-13985.jpg',
  bio: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuth = false
      state.username = ''
      state.email = ''
      state.token = ''
      state.image = ''
      state.bio = ''
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuth = true
      state.username = action.payload.username
      state.email = action.payload.email
      state.token = action.payload.token
      state.image = action.payload.image
      state.bio = action.payload.bio
    },
  },
})

export const selectUserData = (state: RootState) => {
  const { email, username, image } = state.user

  return {
    email,
    username,
    avatar: image,
  }
}
export const selectIsAuth = (state: RootState) => state.user.isAuth
export const selectToken = (state: RootState) => state.user.token

export const { logoutUser, setUser } = userSlice.actions
export default userSlice.reducer
