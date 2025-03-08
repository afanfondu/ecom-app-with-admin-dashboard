import { OrdersDataTable } from './order-data-table'

export default function OrdersManagementPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
      </div>
      <OrdersDataTable />
    </div>
  )
}
