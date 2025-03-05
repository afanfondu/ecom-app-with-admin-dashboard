import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'
import DashboardSidebar from './dashboard-sidebar'

export default function AdminLayout() {
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
