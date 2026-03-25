import * as yup from 'yup'

export const forgetPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
})