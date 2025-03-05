import { Button } from '@/components/ui/button'
import { ProductsTable } from './products-table'
import ProductDialog, { ProductProp } from './product-dialog'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import useAuth from '@/store/useAuth'
import { Role } from '@/lib/types'

const defaultValues = {
  title: '',
  description: '',
  price: undefined,
  category: undefined,
  image: ''
}

export default function ProductsManagementPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] =
    useState<ProductProp>(defaultValues)
  const user = useAuth(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role !== Role.Admin) navigate('/')
  }, [user, navigate])

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Button
          onClick={() => {
            setSelectedProduct(defaultValues)
            setIsDialogOpen(true)
          }}
        >
          Add New Product
        </Button>
      </div>
      <ProductsTable
        setIsDialogOpen={setIsDialogOpen}
        setSelectedProduct={setSelectedProduct}
      />
      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedProduct={selectedProduct}
      />
    </div>
  )
}
