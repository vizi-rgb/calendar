import SideBar from "@/components/topbar/side-bar";
import Topbar from "@/components/topbar/topbar";

export default function CalendarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="px-5 h-screen flex flex-col">
      <div className="grow-0 shrink-0">
        <Topbar />
      </div>
      <div className="flex flex-row py-2 gap-x-2 flex-auto overflow-hidden">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
