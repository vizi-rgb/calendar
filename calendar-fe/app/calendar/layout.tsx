import SideBar from "@/components/topbar/side-bar";
import Topbar from "@/components/topbar/topbar";

export default function CalendarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="px-5">
      <Topbar />
      <div className="flex flex-row py-2 gap-x-2">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
