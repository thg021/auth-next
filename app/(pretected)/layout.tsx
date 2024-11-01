import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider open={false}>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="md:hidden lg:-ml-3 z-50" />
        <div className="w-full p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
