import { useState } from 'react'
import * as yup from 'yup'

import { FieldType, Form } from '../components/form.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks.ts'
import { setUser } from '../store/slices/userSlice.ts'
import { signUpUser } from '../api/userAPI.ts'

const formSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password length should be at least 6 characters')
    .max(40, 'Password cannot exceed more than 40 characters'),
  cpassword: yup
    .string()
    .required('Confirm Password is required')
    .min(6, 'Password length should be at least 6 characters')
    .max(40, 'Password cannot exceed more than 40 characters')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username length should be at least 3 characters')
    .max(20, 'Username cannot exceed more than 20 characters'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  personal: yup.boolean().oneOf([true], 'You have to accept an agreement'),
})

type FormValues = yup.InferType<typeof formSchema>

const formFields: FieldType[] = [
  {
    label: 'Username',
    name: 'username',
  },
  {
    label: 'Email address',
    name: 'email',
  },
  {
    label: 'Password',
    name: 'password',
  },
  {
    label: 'Repeat Password',
    name: 'cpassword',
  },
]

const SignUpPage = () => {
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState({})

  const onSubmit = async (data: FormValues) => {
    const { username, email, password } = data
    const navigate = useNavigate()
    const response = await signUpUser({
      username,
      email,
      password,
    })

    if (response.type === 'TAKEN') {
      setErrors(response.data.errors)
    } else {
      dispatch(setUser(response.data.user))
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }

  return (
    <>
      <Form
        submitHandler={onSubmit}
        title={'Create new account'}
        buttonText={'Create'}
        validationSchema={formSchema}
        fieldsData={formFields}
        needDataAgree
        helpText={
          <>
            Already have an account? <Link to={'/sign-in-page'}>Sign In</Link>.
          </>
        }
        errors={errors}
      />
    </>
  )
}

export default SignUpPage
