import ProductsSkeleton from './products-skeleton'
import ProductCard from './product-card'
import AlertError from '@/components/shared/alert-error'
import useProducts from '@/hooks/use-products'
import Filters from './filters'
import { useSearchParams } from 'react-router'
import useCategoryProducts from '@/hooks/use-category-products'

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const limit = searchParams.get('limit')
  const sort = searchParams.get('sort')

  const { data: products, isLoading, error } = useProducts({ sort, limit })
  const {
    data: categoryProducts,
    isLoading: categoryLoading,
    error: categoryError
  } = useCategoryProducts({
    category,
    sort,
    limit
  })

  return (
    <div>
      <Filters />

      {category ? (
        <>
          {categoryError && <AlertError description={categoryError.message} />}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryLoading && <ProductsSkeleton />}
            {categoryProducts?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <>
          {error && <AlertError description={error.message} />}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading && <ProductsSkeleton />}
            {products?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
