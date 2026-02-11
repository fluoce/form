import CSidebar from "@/components/custom/CSidebar";
import FormSidebar from "@/components/navigation/FormSidebar";
import Topbar from "@/components/navigation/Topbar";

export default function FLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CSidebar>
        <FormSidebar />
      </CSidebar>
      <div className="flex flex-col w-full">
        <Topbar />
        <main className="w-full flex items-center justify-center p-4">
          {children}
        </main>
      </div>
    </>
  )
}
