import { useSearchParams } from 'react-router'
import useCategories from '@/hooks/useCategories'
import CategoryListSkeleton from './filters-skeleton'
import { Select, SelectContent } from '@/components/ui/select'
import { SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const LIMITS = ['5', '10', '15', '20']

export default function Filters() {
  const { data: categories, isLoading } = useCategories()
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category')
  const limit = searchParams.get('limit')
  const sort = searchParams.get('sort')

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 border-b pb-4 overflow-x-auto">
          {isLoading ? (
            <CategoryListSkeleton />
          ) : (
            <>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={category ?? 'all'}
                  onValueChange={category => {
                    if (category === 'all') searchParams.delete('category')
                    else searchParams.set('category', category)
                    setSearchParams(searchParams)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All products</SelectItem>
                    {categories?.map((cat, idx) => (
                      <SelectItem key={idx} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Sort by</label>
                <Select
                  value={sort ?? 'asc'}
                  onValueChange={sort => {
                    searchParams.set('sort', sort)
                    setSearchParams(searchParams)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">
                      {category ? 'Price: Low to High' : 'ID: Ascending'}
                    </SelectItem>
                    <SelectItem value="desc">
                      {category ? 'Price: High to Low' : 'ID: Descending'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Limit</label>
                <Select
                  value={limit ?? '20'}
                  onValueChange={limit => {
                    searchParams.set('limit', limit)
                    setSearchParams(searchParams)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a limit" />
                  </SelectTrigger>
                  <SelectContent>
                    {LIMITS.map((limit, idx) => (
                      <SelectItem key={idx} value={limit}>
                        {limit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium invisible">
                  Set Default
                </label>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchParams({})
                  }}
                  className="flex items-center gap-2"
                  disabled={!category && !limit && !sort}
                >
                  Set Default
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
