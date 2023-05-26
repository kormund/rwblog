import axios from 'axios'
import { RequestOptionsType } from '../types/post.ts'
import { SigningUp, UpdateUser } from '../types/user.ts'

export const baseUrl = 'https://blog.kata.academy/api'

type FetchDataType = (path: string, options: RequestOptionsType, token?: unknown) => Promise<any>

export const fetchData: FetchDataType = async (path, options, token) => {
  return axios({
    ...options,
    url: `${baseUrl}/${path}`,
    headers: {
      Authorization: token ? `Token ${token}` : undefined,
    },
  })
}

export const signUpUser: SigningUp = async (props) => {
  try {
    const response = await fetchData('users', {
      method: 'POST',
      data: {
        user: props,
      },
    })

    return {
      type: 'OK',
      data: response.data,
    }
  } catch (e: any) {
    if (e.request.status === 422) {
      return {
        type: 'TAKEN',
        data: e.response?.data,
      }
    }

    throw new Error('request error')
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetchData('users/login', {
      method: 'POST',
      data: {
        user: {
          email,
          password,
        },
      },
    })

    return {
      type: 'SUCCESS',
      data: response.data,
    }
  } catch (e: any) {
    if (e.response.status === 422) {
      return {
        type: 'AUTH_ERROR',
        data: e.response.data,
      }
    }

    throw new Error('cant login')
  }
}

export const updateUser: UpdateUser = async (newValues, token) => {
  try {
    const response = await fetchData(
      '/user',
      {
        method: 'PUT',
        data: { user: newValues },
      },
      token,
    )

    return {
      type: 'OK',
      data: response.data,
    }
  } catch (e: any) {
    if (e.response.status === 422) {
      return {
        type: 'TAKEN',
        data: e.response.data,
      }
    }

    throw new Error('cant update user data')
  }
}
