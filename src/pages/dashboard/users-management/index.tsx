import { UsersDataTable } from './users-data-table'

export default function UsersManagementPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>
      <UsersDataTable />
    </div>
  )
}
