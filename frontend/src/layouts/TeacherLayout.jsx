import {Outlet, Navigate} from "react-router-dom";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import TeacherSidebar from "@/components/TeacherSidebar";

export default function TeacherLayout() {
  if (!localStorage.getItem("jwt"))
    return (<Navigate to="/accounts/log-in" replace={true} />);

  return (
    <SidebarProvider defaultOpen={true}>
      <TeacherSidebar />
      <main className="w-full">
        <div className="h-full pr-4 flex justify-start items-start gap-x-2">
          <SidebarTrigger className="w-10 h-10"/>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
