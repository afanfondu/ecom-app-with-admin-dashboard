import { ColumnDef } from '@tanstack/react-table'
import { Order } from '@/hooks/use-orders'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Eye, Trash2 } from 'lucide-react'
import { DrawerTrigger } from '@/components/ui/drawer'
import { formatCurrency, formatDate } from '@/lib/utils'
import { LoadingButton } from '@/components/shared/loading-button'

export const getColumns = ({
  setSelectedOrder,
  deletingOrderId,
  deleteHandler
}: {
  setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>
  deleteHandler: (orderId: number) => void
  deletingOrderId: number | null
}): ColumnDef<Order>[] => [
  {
    accessorKey: 'id',
    header: 'Order ID',
    cell: ({ row }) => <div>#{row.original.id}</div>
  },
  {
    accessorKey: 'customerName',
    header: 'Customer Name',
    cell: ({ row }) => {
      const user = row.original.user

      return <div>{`${user.name.firstname} ${user.name.lastname}`}</div>
    }
  },
  {
    accessorKey: 'customerEmail',
    header: 'Customer Email',
    cell: ({ row }) => {
      const user = row.original.user
      return <div>{user.email}</div>
    }
  },
  {
    accessorKey: 'orderDate',
    header: 'Order Date',
    cell: ({ row }) => {
      const order = row.original
      return <div>{formatDate(order.date)}</div>
    },
    filterFn: (row, _, filterValue) => {
      const orderDate = new Date(row.original.date)
      if (orderDate >= filterValue.from) {
        if (filterValue.to) return orderDate <= filterValue.to
        else return true
      }
      return false
    }
  },
  {
    accessorKey: 'items',
    header: 'No. of Items',
    cell: ({ row }) => {
      const order = row.original
      return <div>{order.products.length}</div>
    }
  },
  {
    accessorKey: 'total',
    accessorFn: row =>
      row.products.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total <ArrowUpDown className="w-4 h-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const total = row.original.products.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      )
      return <div className="pl-4">{formatCurrency(total)}</div>
    }
  },
  {
    accessorKey: 'actions',
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <DrawerTrigger asChild onClick={() => setSelectedOrder(row.original)}>
            <Button variant={'ghost'}>
              <Eye className="w-4 h-4" />
            </Button>
          </DrawerTrigger>
          <LoadingButton
            isLoading={deletingOrderId === row.original.id}
            onClick={() => deleteHandler(row.original.id)}
            variant={'destructive'}
          >
            <Trash2 className="w-4 h-4" />
          </LoadingButton>
        </div>
      )
    }
  }
]
