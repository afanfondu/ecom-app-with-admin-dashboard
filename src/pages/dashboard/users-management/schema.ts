import { object, string, number, InferType } from 'yup'

export const userFormSchema = object({
  username: string().required('Username is required'),
  email: string().required('Email is required').email('Invalid email'),
  password: string(),
  name: object({
    firstname: string().required('First name is required'),
    lastname: string().required('Last name is required')
  }),
  address: object({
    city: string().required('City is required'),
    street: string().required('Street is required'),
    number: number().required('Street number is required'),
    zipcode: string().required('ZIP code is required')
  }),
  phone: string().required('Phone number is required')
})

export type UserFormType = InferType<typeof userFormSchema>
