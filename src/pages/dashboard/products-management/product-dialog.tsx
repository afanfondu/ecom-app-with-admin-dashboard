import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ProductAddForm, productAddFormSchema } from './schema'
import { addProduct, editProduct } from './actions'
import { LoadingButton } from '@/components/shared/loading-button'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { Category } from '@/lib/types'

export type ProductProp = {
  id?: number
  title: string
  description: string
  price: number | undefined
  category: Category | undefined
  image: string
}

export default function ProductDialog({
  selectedProduct,
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedProduct: ProductProp
}) {
  const form = useForm<ProductAddForm>({
    resolver: zodResolver(productAddFormSchema),
    values: {
      title: selectedProduct.title,
      description: selectedProduct.description,
      price: selectedProduct.price as number,
      category: selectedProduct.category as Category,
      image: selectedProduct.image
    }
  })

  const { isPending, mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: data => {
      toast.success(
        'Product added successfully\n' + JSON.stringify(data, null, 2)
      )
      form.reset()
      onOpenChange(false)
    },
    onError: error => {
      toast.error(error.message)
    }
  })

  const { isPending: isEditPending, mutate: editMutate } = useMutation({
    mutationFn: editProduct,
    onSuccess: data => {
      toast.success(
        'Product edited successfully\n' + JSON.stringify(data, null, 2)
      )
      form.reset()
      onOpenChange(false)
    },
    onError: error => {
      toast.error(error.message)
    }
  })

  async function onSubmit(values: ProductAddForm) {
    if (selectedProduct.id) editMutate({ ...values, id: selectedProduct.id })
    else mutate(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="Form to add or edit products">
        <DialogHeader>
          <DialogTitle>
            {selectedProduct.title ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://picsum.photos/id/48/720/420"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              type="submit"
              className="w-full"
              isLoading={isPending || isEditPending}
            >
              {selectedProduct.title ? 'Update Product' : 'Add Product'}
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
