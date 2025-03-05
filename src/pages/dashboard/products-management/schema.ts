import { Category } from '@/lib/types'
import { mixed, number, object, string, InferType } from 'yup'

export const productFormSchema = object({
  title: string().required('Title is required'),
  description: string().required('Description is required'),
  price: number()
    .positive('Price should be greater than 0')
    .required('Price is required'),
  category: mixed<Category>()
    .required('Category is required')
    .oneOf(Object.values(Category)),
  image: string().required('Image URL is required').url('Invalid image URL')
})

export type ProductFormType = InferType<typeof productFormSchema>
