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
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { productFormSchema, ProductFormType } from './schema'
import { addProduct, editProduct } from './actions'
import { LoadingButton } from '@/components/shared/loading-button'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { Category, Product } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function ProductDialog({
  selectedProduct,
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedProduct: Product | null
}) {
  const form = useForm<ProductFormType>({
    resolver: yupResolver(productFormSchema),
    values: {
      title: selectedProduct ? selectedProduct.title : '',
      description: selectedProduct ? selectedProduct.description : '',
      price: selectedProduct ? selectedProduct.price : 0,
      category: selectedProduct
        ? selectedProduct.category
        : Category.Electronics,
      image: selectedProduct ? selectedProduct.image : ''
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

  async function onSubmit(values: ProductFormType) {
    if (selectedProduct) editMutate({ ...values, id: selectedProduct.id })
    else mutate(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="Form to add or edit products">
        <DialogHeader>
          <DialogTitle>
            {selectedProduct ? 'Edit Product' : 'Add New Product'}
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
                    <Select {...field}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {Object.values(Category).map((category, idx) => (
                            <SelectItem key={idx} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
              {selectedProduct ? 'Update Product' : 'Add Product'}
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
