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
} from "@/components/ui/sidebar"
import { Building2, ChartNoAxesGantt, FolderOpen, Home } from "lucide-react"
 
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Proyectos",
    url: "projects",
    icon: ChartNoAxesGantt,
  },
  {
    title: "Clientes",
    url: "clients",
    icon: Building2,
  },
  {
    title: "Archivos",
    url: "files",
    icon: FolderOpen,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}