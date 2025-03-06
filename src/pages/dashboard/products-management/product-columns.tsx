import { Product } from '@/lib/types'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Eye, Pencil, Trash2 } from 'lucide-react'
import { LoadingButton } from '@/components/shared/loading-button'
import { Link } from 'react-router'

export const getColumns = ({
  deleteHandler,
  deletingProductId,
  editHandler
}: {
  deleteHandler: (productId: number) => void
  deletingProductId: number | null
  editHandler: (product: Product) => void
}): ColumnDef<Product>[] => [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <img
        src={row.getValue('image')}
        alt={row.getValue('title')}
        className="w-16 h-16 object-contain"
      />
    )
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const title = row.getValue('title') as string
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-[250px] truncate">{title}</div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-md p-4">
              {title}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
  {
    accessorKey: 'description',
    header: 'Discription',
    cell: ({ row }) => {
      const description = row.getValue('description') as string
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-[250px] truncate">{description}</div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-md p-4">
              {description}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      return <div className="font-medium px-4">${price.toFixed(2)}</div>
    }
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <Link to={`/product/${row.original.id}`}>
            <Button variant={'ghost'}>
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Button onClick={() => editHandler(row.original)} size="sm">
            <Pencil className="w-4 h-4" />
          </Button>
          <LoadingButton
            isLoading={deletingProductId === row.original.id}
            onClick={() => deleteHandler(row.original.id)}
            variant="destructive"
          >
            <Trash2 className="w-4 h-4" />
          </LoadingButton>
        </div>
      )
    }
  }
]
