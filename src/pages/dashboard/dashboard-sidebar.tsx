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
  SidebarHeader,
  SidebarFooter
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
  ChevronUp,
  House,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users
} from 'lucide-react'
import { ActiveLink } from '@/components/shared/navbar'
import { Link } from 'react-router'
import ThemeToggle from '@/components/shared/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import useAuth from '@/store/useAuth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function DashboardSidebar() {
  const user = useAuth(state => state.user)
  const removeAuth = useAuth(state => state.removeAuth)

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center p-2 justify-between">
          <Link to="/">
            <h3 className="text-xl font-bold">E.</h3>
          </Link>
          <ThemeToggle />
        </div>
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {user?.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <span>{user?.name}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => removeAuth()}>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
