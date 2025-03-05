import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import ProductsTableRow from './products-table-row'
import useProducts from '@/hooks/useProducts'
import { ProductProp } from './product-dialog'

export function ProductsTable({
  setIsDialogOpen,
  setSelectedProduct
}: {
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductProp>>
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { data: products } = useProducts({ limit: '20', sort: 'asc' })

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map(product => (
            <ProductsTableRow
              setSelectedProduct={setSelectedProduct}
              setIsDialogOpen={setIsDialogOpen}
              key={product.id}
              product={product}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
