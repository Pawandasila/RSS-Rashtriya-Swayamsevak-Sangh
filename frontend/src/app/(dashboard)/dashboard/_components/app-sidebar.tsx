"use client";

import * as React from "react"
import Image from "next/image"
import { Home, LogOut, Settings, User, ChevronUp, Users, Building, FileText, Shield, Eye, UserPlus, Plus, Cog } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getNavigationItems, getUserRole } from "../actions"

// Icon mapping for dynamic icons
const iconMap = {
  Home,
  Users,
  Building,
  FileText,
  User,
  Settings,
  Shield,
  Eye,
  UserPlus,
  Plus,
  Cog,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth();
  const [navigationItems, setNavigationItems] = React.useState<any[]>([]);
  const [userRole, setUserRole] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Load navigation items and user role on component mount
  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [navItems, roleData] = await Promise.all([
          getNavigationItems(),
          getUserRole(),
        ]);
        
        setNavigationItems(navItems);
        setUserRole(roleData);
      } catch (error) {
        console.error("Failed to load navigation data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    logout();
  };

  // Get role badge variant
  const getRoleBadgeVariant = (roleColor: string) => {
    switch (roleColor) {
      case "destructive":
        return "destructive";
      case "default":
        return "default";
      case "secondary":
        return "secondary";
      case "outline":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className=" text-white flex aspect-square size-10 items-center justify-center rounded-lg p-0">
                  <Image
                    src="/logo/logo.png"
                    alt="RSS Logo"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-sm">RSS</span>
                  <span className="text-xs text-muted-foreground">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {loading ? (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    <span>Loading...</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                navigationItems.map((item) => {
                  const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home;
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url} className="flex items-center gap-3">
                          <IconComponent className="h-4 w-4" />
                          <span className="font-medium">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.children && item.children.length > 0 && (
                        <SidebarMenuSub>
                          {item.children.map((child: any) => {
                            const ChildIconComponent = iconMap[child.icon as keyof typeof iconMap] || Eye;
                            return (
                              <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={child.url} className="flex items-center gap-2">
                                    <ChildIconComponent className="h-3 w-3" />
                                    <span>{child.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage 
                      src={user?.image || ""} 
                      alt={user?.name || "User"} 
                    />
                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
                      {user?.name ? getUserInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-semibold">
                        {user?.name || "User"}
                      </span>
                      {userRole && (
                        <Badge 
                          variant={getRoleBadgeVariant(userRole.roleColor) as any}
                          className="text-xs px-1 py-0 h-4"
                        >
                          {userRole.roleDisplay}
                        </Badge>
                      )}
                    </div>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email || "email@example.com"}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem className="gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="gap-2 text-red-600 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
