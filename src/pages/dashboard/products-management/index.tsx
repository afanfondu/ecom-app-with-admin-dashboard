import { ProductsDataTable } from './product-data-table'

export default function ProductsManagementPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
      </div>
      <ProductsDataTable />
    </div>
  )
}
