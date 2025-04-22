import useFetch from "@/hooks/useFetch"
import {Link, Navigate} from "react-router-dom";
import {Activity, Search, Backpack, Gamepad2} from "lucide-react";
import {
  Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, 
  SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, 
  SidebarMenuSub, SidebarMenuSubItem, SidebarFooter, SidebarSeparator
} from "@/components/ui/sidebar";
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent
} from "@/components/ui/collapsible"

import SidebarCard from "@/components/SidebarCard";
import LogoutAlert from "@/components/LogoutAlert"; 

const features = [
  {title: "Partidas", url: "matches", icon: Activity}, 
  {title: "Niveles", url: "levels", icon: Gamepad2}
];

export default function TeacherSidebar() {
  const {data, error} = useFetch("http://localhost:3000/teachers/details");

  if (error)
    return (<Navigate to="/" replace={true} />);

  return (
    data && (
      <Sidebar variant="floating">
        <SidebarHeader>
          <SidebarCard 
            teacherName={data.name} 
            teacherClass={data.ownedByClass}
          />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Monitorea</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {features.map(feature => (
                  <SidebarMenuItem key={feature.title}>
                    <SidebarMenuButton asChild>
                      <Link to={feature.url}>
                        < feature.icon /> {feature.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton> 
                        <Search /> Buscar 
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem key="students">
                          <SidebarMenuButton asChild>
                            <Link to="search/students">
                              <Backpack /> Alumnos
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Cuenta</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <LogoutAlert />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>    
    )
  );
}