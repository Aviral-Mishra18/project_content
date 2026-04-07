import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/AppSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-20">
        <AppSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
