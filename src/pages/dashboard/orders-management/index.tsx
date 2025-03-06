import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useAuth from '@/store/useAuth'
import { Role } from '@/lib/types'
import { OrdersDataTable } from './order-data-table'

export default function OrdersManagementPage() {
  const user = useAuth(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role !== Role.Admin) navigate('/')
  }, [user, navigate])

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
      </div>
      <OrdersDataTable />
    </div>
  )
}
