import { Category } from '@/lib/types'
import { z } from 'zod'

export const productAddFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  category: z.nativeEnum(Category, {
    message:
      'Please select one of the following category - ' +
      Object.values(Category).join(', ')
  }),
  image: z.string().url('Invalid image URL')
})

export type ProductAddForm = z.infer<typeof productAddFormSchema>
