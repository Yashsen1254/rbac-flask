import { Outlet } from "react-router-dom";

import { SidebarProvider } from "@/components/ui/sidebar";

import AppSidebar from "@/components/layout/AppSidebar";
import AppNavbar from "@/components/layout/AppNavbar";

const DashboardLayout = () => {

  return (

    <SidebarProvider>

      <AppSidebar />

      <main className="flex-1">

        <AppNavbar />

        <div className="p-6">

          <Outlet />

        </div>

      </main>

    </SidebarProvider>

  );

};

export default DashboardLayout;