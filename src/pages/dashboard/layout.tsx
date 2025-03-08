import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet, useNavigate } from 'react-router'
import DashboardSidebar from './dashboard-sidebar'
import useAuth from '@/store/useAuth'
import { useEffect } from 'react'
import { Role } from '@/lib/types'

export default function AdminLayout() {
  const user = useAuth(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role === Role.User) navigate('/login')
  })

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="container py-8 max-w-6xl px-4 mx-auto">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
