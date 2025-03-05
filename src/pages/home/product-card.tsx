import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Product } from '@/lib/types'
import { Link } from 'react-router'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`product/${product.id}`}>
      <Card key={product.id} className="flex flex-col justify-between">
        <CardContent className="pt-4">
          <div className="aspect-square overflow-hidden rounded-md">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <h3 className="mt-4 line-clamp-1 text-lg font-medium">
            {product.title}
          </h3>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-lg font-bold">${product.price}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
