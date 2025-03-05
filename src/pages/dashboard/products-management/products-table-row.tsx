import { TableRow, TableCell } from '@/components/ui/table'
import { Product } from '@/lib/types'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteProduct } from './actions'
import { LoadingButton } from '@/components/shared/loading-button'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { ProductProp } from './product-dialog'

export default function ProductsTableRow({
  setIsDialogOpen,
  product,
  setSelectedProduct
}: {
  product: Product
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductProp>>
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success('Product deleted successfully')
    },
    onError: error => {
      toast.error(error.message)
    }
  })

  const deleteHandler = async () => {
    const deleteConfirm = confirm(
      'Are you sure you want to delete this product?'
    )
    if (!deleteConfirm) return

    mutate(product.id.toString())
  }

  return (
    <TableRow key={product.id}>
      <TableCell>
        <img
          src={product.image}
          alt={product.title}
          className="w-16 h-16 object-contain"
        />
      </TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setSelectedProduct(product)
              setIsDialogOpen(true)
            }}
            variant="outline"
            size="icon"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <LoadingButton
            onClick={deleteHandler}
            variant="destructive"
            isLoading={isPending}
          >
            <Trash2 className="h-4 w-4" />
          </LoadingButton>
        </div>
      </TableCell>
    </TableRow>
  )
}
