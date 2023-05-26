import { useState } from 'react'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'

import { FieldType, Form } from '../components/form'

import { loginUser } from '../api/userAPI.ts'
import { setUser } from '../store/slices/userSlice.ts'
import { useAppDispatch } from '../store/hooks.ts'

const formSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
})

type FormValues = yup.InferType<typeof formSchema>

const formFields: FieldType[] = [
  {
    label: 'Email address',
    name: 'email',
  },
  {
    label: 'Password',
    name: 'password',
  },
]

const SignInPage = () => {
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const onSubmit = async (data: FormValues) => {
    const { email, password } = data

    const response = await loginUser(email, password)

    if (response.type === 'AUTH_ERROR') {
      setErrors({
        email: 'invalid email or password',
        password: 'invalid email or password',
      })
    } else {
      dispatch(setUser(response.data.user))
      setTimeout(() => {
        navigate('/')
      }, 500)
    }
  }

  return (
    <div>
      <Form
        submitHandler={onSubmit}
        title={'Sign In'}
        buttonText={'Login'}
        validationSchema={formSchema}
        fieldsData={formFields}
        helpText={
          <>
            Don’t have an account? <Link to={'/sign-up-page'}>Sign Up</Link>.
          </>
        }
        errors={errors}
      />
    </div>
  )
}

export default SignInPage
