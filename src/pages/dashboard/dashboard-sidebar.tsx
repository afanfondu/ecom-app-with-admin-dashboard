import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  Sidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarHeader
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible'
import {
  AppWindow,
  Boxes,
  ChevronDown,
  House,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users
} from 'lucide-react'
import { ActiveLink } from '@/components/shared/navbar'
import { Link } from 'react-router'

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex items-center p-2">
          <h3 className="text-xl font-bold">E.</h3>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <AppWindow className="w-4 h-4" />
                        <span>Application</span>
                      </div>
                      <ChevronDown className="" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <ActiveLink
                          to="/"
                          className="flex items-center space-x-2"
                        >
                          <House className="w-4 h-4" />
                          <span>Home</span>
                        </ActiveLink>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <ActiveLink
                          to="/cart"
                          className="flex items-center space-x-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Cart</span>
                        </ActiveLink>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ActiveLink
                    to="/dashboard"
                    className="flex items-center space-x-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </ActiveLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ActiveLink
                    to="/dashboard/management/products"
                    className="flex items-center space-x-2"
                  >
                    <Package className="w-4 h-4" />
                    <span>Products</span>
                  </ActiveLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ActiveLink
                    to="/dashboard/management/orders"
                    className="flex items-center space-x-2"
                  >
                    <Boxes className="w-4 h-4" />
                    <span>Orders</span>
                  </ActiveLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ActiveLink
                    to="/dashboard/management/users"
                    className="flex items-center space-x-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>Users</span>
                  </ActiveLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
