import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export const ClientShell = ({ title, children }: { title?: string; children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background bg-aurora">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/80 backdrop-blur-sm">
            <SidebarTrigger className="mr-2" />
            {title && <h1 className="text-lg font-semibold">{title}</h1>}
          </header>
          <main className="flex-1 bg-background/50">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ClientShell;
