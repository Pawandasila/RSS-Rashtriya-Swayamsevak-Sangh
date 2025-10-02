"use client";

import React, { useEffect } from 'react'
import useAxios from '@/hooks/use-axios'
import { useAuth } from '@/hooks/use-auth'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/app-sidebar"

const layout = ({children}: Readonly<{children : React.ReactNode}>) => {
  const axiosInstance = useAxios();
  const { setUserData } = useAuth();
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get('/dashboard/');
        console.log('Dashboard API Response:', response.data);
        
        setUserData(response.data);
        console.log('User data stored in localStorage and context successfully');
        
      } catch (error) {
        console.error('Dashboard API Error:', error);
      }
    };

    fetchDashboardData();
  }, [axiosInstance, setUserData]);
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Home</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-3">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default layout