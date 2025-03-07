import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router'
import ProductDetailsSkeleton from './product-details-skeleton'
import { ChevronsLeft } from 'lucide-react'
import { toast } from 'sonner'
import useProductDetails from '@/hooks/use-product-details'
import useCart from '@/store/useCart'

export default function ProductDetailsPage() {
  const navigate = useNavigate()
  const { productId } = useParams()

  if (!productId) <div>Product not found</div>

  const { data: product, isLoading } = useProductDetails(productId!)
  const items = useCart(state => state.items)
  const addItem = useCart(state => state.addItem)

  if (isLoading) return <ProductDetailsSkeleton />

  if (!product) return <div>Product not found</div>

  const addToCart = () => {
    const itemExists = items.find(item => item.product.id === product.id)
    if (itemExists) return toast.info('Product already in cart')

    addItem({ product, quantity: 1 })
    toast.success('Product added to cart')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" className="mb-8" onClick={() => navigate(-1)}>
        <ChevronsLeft /> Back
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold">${product.price}</p>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="mt-auto">
            <Button className="w-full" onClick={addToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
