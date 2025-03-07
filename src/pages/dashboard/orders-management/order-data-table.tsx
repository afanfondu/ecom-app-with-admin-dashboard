import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { getColumns } from './order-columns'
import useOrders, { Order } from '@/hooks/use-orders'
import { Drawer } from '@/components/ui/drawer'
import DateRangePicker from './components/date-range-picker'
import OrderDrawer from './components/order-drawer'
import { useDeleteOrder } from './mutations/use-delete-order'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { TableSkeleton } from '../table-skeleton'
import AlertError from '@/components/shared/alert-error'

export function OrdersDataTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [deletingOrderId, setDeletingOrderId] = useState<number | null>(null)

  const { data: orders = [], isLoading, error } = useOrders()

  const { mutate } = useDeleteOrder({
    onSuccess: data => {
      toast.success('Order deleted successfully! ' + JSON.stringify(data))
      setDeletingOrderId(null)
    },
    onError: error => {
      const errMsg =
        error instanceof AxiosError
          ? (error.response?.data as string)
          : 'Something went wrong while deleting order!'
      toast.error(errMsg)
      setDeletingOrderId(null)
    }
  })

  const deleteOrderHandler = (orderId: number) => {
    const deleteConfirm = confirm('Are you sure you want to delete this order?')
    if (!deleteConfirm) return
    setDeletingOrderId(orderId)
    mutate(orderId)
  }

  const columns = getColumns({
    setSelectedOrder,
    deletingOrderId,
    deleteHandler: deleteOrderHandler
  })

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,

    state: {
      columnFilters,
      sorting
    },

    initialState: {
      pagination: {
        pageSize: 5
      }
    }
  })

  if (isLoading) return <TableSkeleton />
  if (error) return <AlertError description={error.message} />

  return (
    <>
      <div className="flex items-center py-4 justify-between">
        <DateRangePicker table={table} />
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={value =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Drawer>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <OrderDrawer selectedOrder={selectedOrder} />
        </Drawer>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  )
}
