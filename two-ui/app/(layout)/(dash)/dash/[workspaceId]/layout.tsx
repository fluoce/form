import CSidebar from "@/components/custom/CSidebar";
import MainSidebar from "@/components/navigation/MainSidebar";
import Topbar from "@/components/navigation/Topbar";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CSidebar>
        <MainSidebar />
      </CSidebar>
      <div className="flex w-full flex-col">
        <Topbar />
        <main className="w-full p-4">{children}</main>
      </div>
    </>
  );
}
