import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroupAction,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { User2, ChevronUp, Truck, LayoutDashboard } from "lucide-react";

export function AppSidebar() {
  return (
    <div className="w-full lg:w-[220px] p-4">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarHeader>
              {" "}
              <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="logo" className="w-8 h-8" />
                <div>
                  <h1 className="font-bold text-xl">
                    Nom<span className="text-red-500">Nom</span>
                  </h1>
                  <p className="text-sm text-black">Swift delivery</p>
                </div>
              </div>
            </SidebarHeader>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LayoutDashboard /> Food menu
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    {" "}
                    <Truck /> Order
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
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        ;
      </Sidebar>
    </div>
  );
}
