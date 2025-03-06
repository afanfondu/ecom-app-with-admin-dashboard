import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Eye, Pencil, Trash2 } from 'lucide-react'
import { LoadingButton } from '@/components/shared/loading-button'
import { APIUser } from '@/hooks/use-orders'
import { DrawerTrigger } from '@/components/ui/drawer'

export const getColumns = ({
  deleteHandler,
  deletingUserId,
  editHandler,
  setSelectedUser
}: {
  deletingUserId: number | null
  deleteHandler: (userId: number) => void
  editHandler: (user: APIUser) => void
  setSelectedUser: React.Dispatch<React.SetStateAction<APIUser | null>>
}): ColumnDef<APIUser>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'username',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Username <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <p className="pl-4">{row.original.username}</p>
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) =>
      `${row.original.name.firstname} ${row.original.name.lastname}`,
    accessorFn: row => `${row.name.firstname} ${row.name.lastname}`
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const { city, street } = row.original.address
      return <div>{`${street}, ${city}`}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <DrawerTrigger asChild onClick={() => setSelectedUser(row.original)}>
            <Button variant={'ghost'} size="sm">
              <Eye className="w-4 h-4" />
            </Button>
          </DrawerTrigger>
          <Button onClick={() => editHandler(row.original)} size="sm">
            <Pencil className="w-4 h-4" />
          </Button>
          <LoadingButton
            isLoading={deletingUserId === row.original.id}
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
